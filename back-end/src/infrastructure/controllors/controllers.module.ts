import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ProductController],
})
export class ControllersModule {}
