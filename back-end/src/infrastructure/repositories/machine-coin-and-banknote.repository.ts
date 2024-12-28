import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MachineCoinAndBanknote } from 'infrastructure/entities/machine-coin-and-banknote.entity';

@Injectable()
export class MachineCoinAndBanknoteRepository extends Repository<MachineCoinAndBanknote> {
  private readonly repository: Repository<MachineCoinAndBanknote>;
  constructor(private readonly dataSource: DataSource) {
    super(MachineCoinAndBanknote, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(MachineCoinAndBanknote);
  }

  async getCoinAndBanknoteByMachineId(
    id: number,
  ): Promise<MachineCoinAndBanknote[]> {
    return this.repository.find({
      where: { machineId: id },
      relations: ['coinAndBanknote'],
    });
  }
}
