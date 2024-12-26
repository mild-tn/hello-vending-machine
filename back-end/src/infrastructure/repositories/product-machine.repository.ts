import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ProductMachine } from '../entities/product-machine.entity';

@Injectable()
export class ProductMachineRepository extends Repository<ProductMachine> {
  private readonly repository: Repository<ProductMachine>;
  constructor(private readonly dataSource: DataSource) {
    super(ProductMachine, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(ProductMachine);
  }

  getProductMachineByProductId(productId: number): Promise<ProductMachine> {
    return this.repository.findOne({
      where: {
        productId: productId,
      },
    });
  }
}
