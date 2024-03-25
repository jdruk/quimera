import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Station } from '../../station/entities/station.entity';
import { Saas } from '../../saas/entities/saas.entity';
  
@Entity()
export class StationConnector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  stationId: number;

  @ManyToOne(() => Saas, (saas) => saas.stationConnectors)
  @JoinColumn({ name: 'saasId' })
  saas: Saas;

  @ManyToOne(() => Station, station => station.stationConnectors)
  @JoinColumn({ name: 'stationId' })
  station: Station;
}

