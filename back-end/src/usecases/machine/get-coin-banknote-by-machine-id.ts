import { InjectRepository } from '@nestjs/typeorm';
import { MachineCoinAndBanknoteRepository } from 'infrastructure/repositories/machine-coin-and-banknote.repository';
import { ILogger } from 'src/domain/config/logger.interface';

export class GetCoinBanknoteByMachineIdUseCases {
  constructor(
    private readonly logger: ILogger,
    @InjectRepository(MachineCoinAndBanknoteRepository)
    private readonly machineCoinAndBanknote: MachineCoinAndBanknoteRepository,
  ) {}

  execute(machineId: number) {
    this.logger.log(
      `${GetCoinBanknoteByMachineIdUseCases.name}`,
      'Get coin and banknote by machine id',
    );
    return this.machineCoinAndBanknote.getCoinAndBanknoteByMachineId(machineId);
  }
}
