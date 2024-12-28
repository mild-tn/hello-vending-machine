import { GetCoinBanknoteByMachineIdUseCases } from 'usecases/machine/get-coin-banknote-by-machine-id';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILogger } from 'src/domain/config/logger.interface';
import { Transaction } from 'src/infrastructure/entities/transaction.entity';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';
import { ProductMachineRepository } from 'src/infrastructure/repositories/product-machine.repository';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';
import { MachineCoinAndBanknoteRepository } from 'infrastructure/repositories/machine-coin-and-banknote.repository';
import { ProductMachine } from 'infrastructure/entities/product-machine.entity';

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
    @InjectRepository(MachineCoinAndBanknoteRepository)
    private readonly machineCoinAndBanknoteRepository: MachineCoinAndBanknoteRepository,
    private readonly getCoinBanknoteByMachineIdUseCases: GetCoinBanknoteByMachineIdUseCases,
  ) {}

  async execute(payload: {
    customerId: number;
    changeAmount: number;
    paidAmount: number;
    productId: number;
    changeCoin: { [key: number]: number } | null;
  }) {
    this.logger.log(`${CreateTransactionUseCases.name}`, 'Create transaction');
    const product = await this.validateProduct(payload.productId);
    const productMachine = await this.validateProductMachine(payload.productId);
    const customer = await this.validateCustomer(payload.customerId);

    product.stockQuantity = Number(product.stockQuantity) - 1;
    this.logger.log(
      `${CreateTransactionUseCases.name}`,
      `Product stock quantity: ${product.stockQuantity} with id: ${payload.productId}`,
    );
    await this.productRepository.updateProduct(payload.productId, product);

    const mapCoinInDB = await this.mapCoinInDB(
      payload.changeCoin,
      productMachine,
    );
    const newCoin = Object.values(mapCoinInDB);
    for (const coin of newCoin) {
      await this.machineCoinAndBanknoteRepository.updateQuantity(
        coin.machineId,
        coin.coinAndBanknoteId,
        coin.quantity,
      );
    }

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
      stockQuantity: product?.stockQuantity,
    } as unknown as Transaction;
    const transaction =
      await this.transactionRepository.createTransaction(payloadTransaction);

    return transaction;
  }

  async validateProduct(productId: number) {
    const product = await this.productRepository.getProduct(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    if (product.stockQuantity < 1) {
      throw new BadRequestException('Product out of stock');
    }

    return product;
  }

  async validateProductMachine(productId: number) {
    const productMachine =
      await this.productMachineRepository.getProductMachineByProductId(
        productId,
      );

    if (!productMachine) {
      throw new BadRequestException('Product machine not found');
    }

    return productMachine;
  }

  async validateCustomer(customerId: number) {
    const customer = await this.customerRepository.getCustomerById(customerId);
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    return customer;
  }

  async mapCoinInDB(
    changeCoin: { [key: number]: number },
    productMachine: ProductMachine,
  ) {
    this.logger.log(
      `${CreateTransactionUseCases.name}`,
      `Update quantity of coin/banknote in machine with id: ${productMachine.id}`,
    );
    const coinInMachine = await this.getCoinBanknoteByMachineIdUseCases.execute(
      productMachine.machineId,
    );
    const mapCoinInDB: {
      [key: number]: {
        coinAndBanknoteId: number;
        machineId: number;
        quantity: number;
      };
    } = {};
    for (const coin of coinInMachine) {
      if (!mapCoinInDB[Number(coin.coinAndBanknote.denomination)]) {
        mapCoinInDB[Number(coin.coinAndBanknote.denomination)] = coin;
      }
    }

    for (const coin in changeCoin) {
      if (mapCoinInDB[coin]?.quantity) {
        mapCoinInDB[coin].quantity =
          Number(mapCoinInDB[coin].quantity) - Number(changeCoin[coin]);
      }
    }

    return mapCoinInDB;
  }
}
