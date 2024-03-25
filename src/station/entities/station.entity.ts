import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { StationGroup } from '../../station-group/entities/station-group.entity';
  import { StationConnector } from '../../station-connectors/entities/station-connector.entity';
import { Saas } from '../../saas/entities/saas.entity';

  @Entity()
  export class Station {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    location: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column()
    stationGroupId: number;
  
    @ManyToOne(() => StationGroup, stationGroup => stationGroup.stations)
    @JoinColumn({ name: 'stationGroupId' })
    stationGroup: StationGroup;

    @ManyToOne(() => Saas, (saas) => saas.stations)
    @JoinColumn({ name: 'saasId' })
    saas: Saas;

    @OneToMany(() => StationConnector, stationConnector => stationConnector.station)
    stationConnectors: StationConnector[];
  }
  
  