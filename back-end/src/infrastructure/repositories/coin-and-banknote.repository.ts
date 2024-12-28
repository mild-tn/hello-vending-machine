import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CoinAndBanknote } from '../entities/coin-and-banknote.entity';

@Injectable()
export class CoinAndBanknoteRepository extends Repository<CoinAndBanknote> {
  private readonly repository: Repository<CoinAndBanknote>;
  constructor(private readonly dataSource: DataSource) {
    super(CoinAndBanknote, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(CoinAndBanknote);
  }

  getCoinAndBanknoteByType(
    type: 'COIN' | 'BANK_NOTE',
  ): Promise<CoinAndBanknote[]> {
    return this.repository.find({
      where: {
        type,
      },
    });
  }
}
