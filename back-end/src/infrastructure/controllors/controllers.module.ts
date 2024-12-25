import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecase-proxy/usecase-proxy.module';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [],
})
export class ControllersModule {}
