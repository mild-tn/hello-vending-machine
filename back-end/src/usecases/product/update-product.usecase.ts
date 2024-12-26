import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/domain/config/logger.interface';
import { Product } from 'src/infrastructure/entities/product.entity';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';

export class UpdateProductStockQuantityUseCases {
  constructor(
    private readonly logger: ILogger,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(productId: number, payload: Pick<Product, 'stockQuantity'>) {
    this.logger.log(
      `${UpdateProductStockQuantityUseCases.name}`,
      'Update product',
    );
    const product = await this.productRepository.getProduct(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    product.stockQuantity = Number(payload.stockQuantity) - 1;
    this.logger.log(
      `${UpdateProductStockQuantityUseCases.name}`,
      `Product stock quantity: ${product.stockQuantity} with id: ${productId}`,
    );
    return this.productRepository.updateProduct(productId, product);
  }
}
