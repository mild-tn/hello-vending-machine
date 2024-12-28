import { InjectRepository } from '@nestjs/typeorm';
import { CoinAndBanknoteRepository } from 'infrastructure/repositories/coin-and-banknote.repository';
import { MachineCoinAndBanknoteRepository } from 'infrastructure/repositories/machine-coin-and-banknote.repository';
import { ILogger } from 'src/domain/config/logger.interface';

export class GetCoinBanknoteByTypeUseCases {
  constructor(
    private readonly logger: ILogger,
    @InjectRepository(CoinAndBanknoteRepository)
    private readonly machineCoinAndBanknote: CoinAndBanknoteRepository,
  ) {}

  execute(type: 'COIN' | 'BANK_NOTE') {
    this.logger.log(
      `${GetCoinBanknoteByTypeUseCases.name}`,
      'Get coin and banknote by Type',
    );
    return this.machineCoinAndBanknote.getCoinAndBanknoteByType(type);
  }
}
