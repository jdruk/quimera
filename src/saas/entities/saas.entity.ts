import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StationGroup } from '../../station-group/entities/station-group.entity';
import { Station } from '../../station/entities/station.entity';
import { StationConnector } from '../../station-connectors/entities/station-connector.entity';

@Entity()
export class Saas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  documentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  host: string;

  @OneToMany(() => User, user => user.saas)
  users: User[];

  @OneToMany(() => StationGroup, stationGroup => stationGroup.saas)
  stationGroups: StationGroup[];

  @OneToMany(() => Station, station => station.saas)
  stations: Station[];

  @OneToMany(() => StationConnector, stationConnector => stationConnector.saas)
  stationConnectors: StationConnector[];
}
