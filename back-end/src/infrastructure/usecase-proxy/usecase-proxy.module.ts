import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/env-config/env-config.module';
import { RepositoriesModule } from '../repositories/repositories.modules';
import { LoggerModule } from '../services/logger/logger.module';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static readonly CREATE_PRODUCT_USECASE = 'CREATE_PRODUCT_USECASE';
  // static GET_PRODUCT_USECASE = 'GET_PRODUCT_USECASE';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      // providers: [
      //   {
      //     inject: [
      //       LoggerService,
      //       ProductRepository,
      //       ProductDescriptionRepository,
      //       CategoryRepository,
      //     ],
      //     provide: UsecasesProxyModule.CREATE_PRODUCT_USECASE,
      //     useFactory(
      //       logger: LoggerService,
      //       productRepo: ProductRepository,
      //       productDescription: ProductDescriptionRepository,
      //       category: CategoryRepository,
      //     ) {
      //       return new UseCaseProxy(
      //         new CreateProductUseCases(
      //           logger,
      //           productRepo,
      //           productDescription,
      //           category,
      //         ),
      //       );
      //     },
      //   },
      //   {
      //     inject: [LoggerService, ProductRepository],
      //     provide: UsecasesProxyModule.GET_PRODUCT_USECASE,
      //     useFactory(logger: LoggerService, productRepo: ProductRepository) {
      //       return new UseCaseProxy(
      //         new GetProductUseCases(logger, productRepo),
      //       );
      //     },
      //   },
      // ],
      exports: [UsecasesProxyModule.CREATE_PRODUCT_USECASE],
    };
  }
}
