import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Customer } from './customer.entity';
import { ProductMachine } from './product-machine.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => ProductMachine)
  @JoinColumn({ name: 'product_machine_id' })
  productMachine: ProductMachine;

  @Column()
  stockQuantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  changeAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  paidAmount: number;

  @Column()
  status: string; // 'SUCCESS' or 'FAILED'

  @Column()
  salesQuantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
