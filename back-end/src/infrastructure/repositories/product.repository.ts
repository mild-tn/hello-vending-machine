import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
  private readonly repository: Repository<Product>;
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(Product);
  }
}
