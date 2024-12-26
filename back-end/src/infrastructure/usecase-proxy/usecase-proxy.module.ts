import { EnvironmentConfigModule } from '../config/env-config/env-config.module';
import { RepositoriesModule } from '../repositories/repositories.modules';
import { LoggerModule } from '../services/logger/logger.module';
import { LoggerService } from '../services/logger/logger.service';
import { GetProductsUseCases } from 'src/usecases/product/get-products.usecase';
import { UseCaseProxy } from './usecases-proxy';
import { ProductRepository } from '../repositories/product.repository';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static readonly GET_PRODUCTS_USECASE = 'GET_PRODUCTS_USECASE';

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
      ],
      exports: [UsecasesProxyModule.GET_PRODUCTS_USECASE],
    };
  }
}