import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Product } from './product.entity';
import { Machine } from './machine.entity';

@Entity()
export class ProductMachine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({
    name: 'product_id',
    nullable: false,
  })
  productId: number;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;
}
