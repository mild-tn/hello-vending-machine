import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CoinAndBanknote } from './coin-and-banknote.entity';
import { Machine } from './machine.entity';

@Entity()
export class MachineCoinAndBanknote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  @Column({
    name: 'machine_id',
    nullable: false,
  })
  machineId: number;

  @ManyToOne(() => CoinAndBanknote)
  @JoinColumn({ name: 'coin_and_banknote_id' })
  coinAndBanknote: CoinAndBanknote;

  @Column({
    name: 'coin_and_banknote_id',
    nullable: false,
  })
  coinAndBanknoteId: number;

  @Column()
  quantity: number;
}
