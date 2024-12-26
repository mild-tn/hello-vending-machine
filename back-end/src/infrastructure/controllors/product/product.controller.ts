import { Controller, Get, Inject } from '@nestjs/common';
import { GetProductsUseCases } from '../../../usecases/product/get-products.usecase';
import { UsecasesProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecases-proxy';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASE)
    private readonly getProductsUseCases: UseCaseProxy<GetProductsUseCases>,
  ) {}

  @Get()
  getProducts() {
    return this.getProductsUseCases.getInstance().execute();
  }
}
