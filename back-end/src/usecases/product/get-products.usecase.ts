import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/domain/config/logger.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';

export class GetProductsUseCases {
  constructor(
    private readonly logger: ILogger,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  execute() {
    this.logger.log(`${GetProductsUseCases.name}`, 'Get products');
    return this.productRepository.getProducts();
  }
}
