import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { ProductRepository } from './product.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Product])],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class RepositoriesModule {}
