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

  @ManyToOne(() => CoinAndBanknote)
  @JoinColumn({ name: 'coin_and_banknote_id' })
  coinAndBanknote: CoinAndBanknote;

  @Column()
  quantity: number;
}
