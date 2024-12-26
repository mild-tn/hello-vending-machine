import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './infrastructure/services/logger/logger.module';
import { ControllersModule } from './infrastructure/controllors/controllers.module';
import { UsecasesProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { EnvironmentConfigModule } from './infrastructure/config/env-config/env-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    ControllersModule,
    UsecasesProxyModule.register(),
    EnvironmentConfigModule,
  ],
})
export class AppModule {}
