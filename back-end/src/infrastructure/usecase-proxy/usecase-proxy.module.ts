import { EnvironmentConfigModule } from '../config/env-config/env-config.module';
import { RepositoriesModule } from '../repositories/repositories.modules';
import { LoggerModule } from '../services/logger/logger.module';
import { LoggerService } from '../services/logger/logger.service';
import { GetProductsUseCases } from 'src/usecases/product/get-products.usecase';
import { UseCaseProxy } from './usecases-proxy';
import { ProductRepository } from '../repositories/product.repository';
import { DynamicModule, Module } from '@nestjs/common';
import { CreateTransactionUseCases } from 'src/usecases/transaction/create-transaction.usecase';
import { TransactionRepository } from '../repositories/transaction.repository';
import { ProductMachineRepository } from '../repositories/product-machine.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import { GetTransactionByCustomerIdUseCases } from 'src/usecases/transaction/get-transaction-by-customer-id.usecase';
import { GetCoinBanknoteByMachineIdUseCases } from 'usecases/machine/get-coin-banknote-by-machine-id';
import { MachineCoinAndBanknoteRepository } from 'infrastructure/repositories/machine-coin-and-banknote.repository';
import { CoinAndBanknoteRepository } from 'infrastructure/repositories/coin-and-banknote.repository';
import { GetCoinBanknoteByTypeUseCases } from 'usecases/coin-and-banknote/get-coin-and-banknote';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static readonly GET_PRODUCTS_USECASE = 'GET_PRODUCTS_USECASE';
  static readonly CREATE_TRANSACTION_USECASE = 'CREATE_TRANSACTION_USECASE';
  static readonly GET_TRANSACTIONS_BY_CUSTOMER_ID_USECASE =
    'GET_TRANSACTIONS_BY_CUSTOMER_ID_USECASE';
  static readonly GET_COIN_BANKNOTE_BY_MACHINE_ID_USECASE =
    'GET_COIN_BANKNOTE_BY_MACHINE_ID_USECASE';
  static readonly GET_COIN_BANKNOTE_BY_TYPE_USECASE =
    'GET_COIN_BANKNOTE_BY_TYPE_USECASE';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, ProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCTS_USECASE,
          useFactory(logger: LoggerService, productRepo: ProductRepository) {
            return new UseCaseProxy(
              new GetProductsUseCases(logger, productRepo),
            );
          },
        },
        {
          inject: [
            LoggerService,
            ProductRepository,
            TransactionRepository,
            ProductMachineRepository,
            CustomerRepository,
          ],
          provide: UsecasesProxyModule.CREATE_TRANSACTION_USECASE,
          useFactory(
            logger: LoggerService,
            productRepo: ProductRepository,
            transactionRepo: TransactionRepository,
            productMachine: ProductMachineRepository,
            customerRepo: CustomerRepository,
          ) {
            return new UseCaseProxy(
              new CreateTransactionUseCases(
                logger,
                productRepo,
                transactionRepo,
                productMachine,
                customerRepo,
              ),
            );
          },
        },
        {
          inject: [LoggerService, TransactionRepository],
          provide: UsecasesProxyModule.GET_TRANSACTIONS_BY_CUSTOMER_ID_USECASE,
          useFactory(
            logger: LoggerService,
            transactionRepo: TransactionRepository,
          ) {
            return new UseCaseProxy(
              new GetTransactionByCustomerIdUseCases(logger, transactionRepo),
            );
          },
        },
        {
          inject: [LoggerService, MachineCoinAndBanknoteRepository],
          provide: UsecasesProxyModule.GET_COIN_BANKNOTE_BY_MACHINE_ID_USECASE,
          useFactory(
            logger: LoggerService,
            machineCoinAndBanknote: MachineCoinAndBanknoteRepository,
          ) {
            return new UseCaseProxy(
              new GetCoinBanknoteByMachineIdUseCases(
                logger,
                machineCoinAndBanknote,
              ),
            );
          },
        },
        {
          inject: [LoggerService, CoinAndBanknoteRepository],
          provide: UsecasesProxyModule.GET_COIN_BANKNOTE_BY_TYPE_USECASE,
          useFactory(
            logger: LoggerService,
            coinAndBanknote: CoinAndBanknoteRepository,
          ) {
            return new UseCaseProxy(
              new GetCoinBanknoteByTypeUseCases(logger, coinAndBanknote),
            );
          },
        },
      ],
      exports: [
        UsecasesProxyModule.GET_PRODUCTS_USECASE,
        UsecasesProxyModule.CREATE_TRANSACTION_USECASE,
        UsecasesProxyModule.GET_TRANSACTIONS_BY_CUSTOMER_ID_USECASE,
        UsecasesProxyModule.GET_COIN_BANKNOTE_BY_MACHINE_ID_USECASE,
        UsecasesProxyModule.GET_COIN_BANKNOTE_BY_TYPE_USECASE,
      ],
    };
  }
}
