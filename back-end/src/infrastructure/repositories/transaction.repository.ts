import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  private readonly repository: Repository<Transaction>;
  constructor(private readonly dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(Transaction);
  }

  createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.repository.save(transaction);
  }

  getTransactionByCustomerId(customerId: number): Promise<Transaction[]> {
    return this.repository.find({
      where: {
        customerId: customerId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }
}
