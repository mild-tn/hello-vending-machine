import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoinAndBanknote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'COIN' or 'BANK_NOTE'

  @Column('decimal', { precision: 10, scale: 2 })
  denomination: number;
}
