import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: '',
  })
  images: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    name: 'stock_quantity',
    default: 0,
  })
  stockQuantity: number;
}
