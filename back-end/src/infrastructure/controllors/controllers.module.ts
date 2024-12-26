import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { ProductController } from './product/product.controller';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ProductController, TransactionController],
})
export class ControllersModule {}
