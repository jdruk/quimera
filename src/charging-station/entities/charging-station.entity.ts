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
  import { ChargingStationGroup } from '../../charging-station-group/entities/charging-station-group.entity';
  import { ChargingConnector } from '../../charging-connectors/entities/charging-connector.entity';

  @Entity()
  export class ChargingStation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    location: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column()
    chargingStationGroupId: number;
  
    @ManyToOne(() => ChargingStationGroup, chargingStationGroup => chargingStationGroup.chargingStations)
    @JoinColumn({ name: 'chargingStationGroupId' })
    chargingStationGroup: ChargingStationGroup;

    @OneToMany(() => ChargingConnector, chargingConnector => chargingConnector.chargingStation)
    chargingConnectors: ChargingConnector[];
  }
  
  