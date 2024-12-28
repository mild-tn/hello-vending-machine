import { Controller, Get, Inject, Query } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecases-proxy';
import { GetCoinBanknoteByTypeUseCases } from 'usecases/coin-and-banknote/get-coin-and-banknote';

@Controller('coins-and-banknotes')
export class CoinAndBanknoteController {
  constructor(
    @Inject(UsecasesProxyModule.GET_COIN_BANKNOTE_BY_TYPE_USECASE)
    private readonly getCoinAndBanknoteByUsecase: UseCaseProxy<GetCoinBanknoteByTypeUseCases>,
  ) {}

  @Get()
  getCoinAndBanknoteByMachineId(@Query('type') type: 'COIN' | 'BANK_NOTE') {
    return this.getCoinAndBanknoteByUsecase.getInstance().execute(type);
  }
}
