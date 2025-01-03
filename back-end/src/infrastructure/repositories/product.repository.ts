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

  getProducts(): Promise<Product[]> {
    return this.repository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  getProduct(productId: number): Promise<Product> {
    return this.repository.findOne({
      where: {
        id: productId,
      },
    });
  }

  updateProduct(productId: number, product: Product): Promise<Product> {
    return this.repository.save({
      id: productId,
      ...product,
    });
  }
}
