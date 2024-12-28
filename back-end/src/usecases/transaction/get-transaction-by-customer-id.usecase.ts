import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/domain/config/logger.interface';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

export class GetTransactionByCustomerIdUseCases {
  constructor(
    private readonly logger: ILogger,

    @InjectRepository(TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(customerId: number) {
    this.logger.log(
      `${GetTransactionByCustomerIdUseCases.name}`,
      'Get transaction by customer id',
    );
    return this.transactionRepository.getTransactionByCustomerId(customerId);
  }
}
