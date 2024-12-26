import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/domain/config/logger.interface';
import { Transaction } from 'src/infrastructure/entities/transaction.entity';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';
import { ProductMachineRepository } from 'src/infrastructure/repositories/product-machine.repository';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

export class CreateTransactionUseCases {
  constructor(
    private readonly logger: ILogger,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    @InjectRepository(TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
    @InjectRepository(ProductMachineRepository)
    private readonly productMachineRepository: ProductMachineRepository,
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(payload: {
    customerId: number;
    changeAmount: number;
    paidAmount: number;
    productId: number;
  }) {
    this.logger.log(`${CreateTransactionUseCases.name}`, 'Create transaction');
    const product = await this.productRepository.getProduct(payload.productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    if (product.stockQuantity < 1) {
      throw new BadRequestException('Product out of stock');
    }

    const productMachine =
      await this.productMachineRepository.getProductMachineByProductId(
        payload.productId,
      );

    if (!productMachine) {
      throw new BadRequestException('Product machine not found');
    }

    const customer = await this.customerRepository.getCustomerById(
      payload.customerId,
    );
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    product.stockQuantity = Number(product.stockQuantity) - 1;
    this.logger.log(
      `${CreateTransactionUseCases.name}`,
      `Product stock quantity: ${product.stockQuantity} with id: ${payload.productId}`,
    );
    await this.productRepository.updateProduct(payload.productId, product);

    this.logger.log(
      `${CreateTransactionUseCases.name}`,
      `Create transaction with product id: ${payload.productId}`,
    );
    const payloadTransaction = {
      customer,
      status: 'SUCCESS',
      salesQuantity: 1,
      changeAmount: payload.changeAmount,
      paidAmount: payload.paidAmount,
      productMachine,
      stockQuantity: product.stockQuantity,
    } as unknown as Transaction;
    return await this.transactionRepository.createTransaction(
      payloadTransaction,
    );
  }
}
