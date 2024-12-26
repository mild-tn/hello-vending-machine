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

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      ProductMachine,
      Product,
      Transaction,
      CustomerRepository,
    ]),
  ],
  providers: [
    ProductRepository,
    TransactionRepository,
    ProductMachineRepository,
    CustomerRepository,
  ],
  exports: [
    ProductRepository,
    TransactionRepository,
    ProductMachineRepository,
    CustomerRepository,
  ],
})
export class RepositoriesModule {}
