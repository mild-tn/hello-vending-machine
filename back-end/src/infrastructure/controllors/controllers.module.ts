import { Module } from '@nestjs/common';

import { UsecasesProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { ProductController } from './product/product.controller';
import { TransactionController } from './transaction/transaction.controller';
import { MachineCoinAndBanknoteController } from './machine-coin-and-banknote/machine-coin-and-banknote.controller';
import { CoinAndBanknoteController } from './coin-and-banknote/coin-and-banknote.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [
    ProductController,
    TransactionController,
    MachineCoinAndBanknoteController,
    CoinAndBanknoteController,
  ],
})
export class ControllersModule {}
