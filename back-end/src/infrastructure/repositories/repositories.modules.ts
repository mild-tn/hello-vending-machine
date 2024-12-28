import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { ProductRepository } from './product.repository';
import { TransactionRepository } from './transaction.repository';
import { ProductMachineRepository } from './product-machine.repository';
import { ProductMachine } from '../entities/product-machine.entity';
import { Transaction } from '../entities/transaction.entity';
import { CustomerRepository } from './customer.repository';
import { MachineCoinAndBanknoteRepository } from './machine-coin-and-banknote.repository';
import { Customer } from 'infrastructure/entities/customer.entity';
import { MachineCoinAndBanknote } from 'infrastructure/entities/machine-coin-and-banknote.entity';
import { CoinAndBanknote } from 'infrastructure/entities/coin-and-banknote.entity';
import { CoinAndBanknoteRepository } from './coin-and-banknote.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      ProductMachine,
      Product,
      Transaction,
      Customer,
      MachineCoinAndBanknote,
      CoinAndBanknote,
    ]),
  ],
  providers: [
    ProductRepository,
    TransactionRepository,
    ProductMachineRepository,
    CustomerRepository,
    MachineCoinAndBanknoteRepository,
    CoinAndBanknoteRepository,
  ],
  exports: [
    ProductRepository,
    TransactionRepository,
    ProductMachineRepository,
    CustomerRepository,
    MachineCoinAndBanknoteRepository,
    CoinAndBanknoteRepository,
  ],
})
export class RepositoriesModule {}
