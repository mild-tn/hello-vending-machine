import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecases-proxy';
import { CreateTransactionUseCases } from 'src/usecases/transaction/create-transaction.usecase';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_TRANSACTION_USECASE)
    private readonly createTransactionUseCases: UseCaseProxy<CreateTransactionUseCases>,
  ) {}

  @Post()
  createTransaction(
    @Body()
    transaction: {
      customerId: number;
      changeAmount: number;
      paidAmount: number;
      productId: number;
    },
  ) {
    return this.createTransactionUseCases.getInstance().execute(transaction);
  }
}
