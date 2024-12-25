import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './env-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../../../.env',
      ignoreEnvFile: !(
        process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
      ),
      isGlobal: true,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
