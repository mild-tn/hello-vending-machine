import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecases-proxy';
import { GetCoinBanknoteByMachineIdUseCases } from 'usecases/machine/get-coin-banknote-by-machine-id';

@Controller('machine')
export class MachineCoinAndBanknoteController {
  constructor(
    @Inject(UsecasesProxyModule.GET_COIN_BANKNOTE_BY_MACHINE_ID_USECASE)
    private readonly getCoinAndBanknoteByIdUsecase: UseCaseProxy<GetCoinBanknoteByMachineIdUseCases>,
  ) {}

  @Get(':id/coin-and-bank-note')
  getCoinAndBanknoteByMachineId(@Param('id') id: number) {
    return this.getCoinAndBanknoteByIdUsecase.getInstance().execute(id);
  }
}
