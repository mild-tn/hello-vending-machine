import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecases-proxy';
import { CreateTransactionUseCases } from 'src/usecases/transaction/create-transaction.usecase';
import { GetTransactionByCustomerIdUseCases } from 'src/usecases/transaction/get-transaction-by-customer-id.usecase';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_TRANSACTION_USECASE)
    private readonly createTransactionUseCases: UseCaseProxy<CreateTransactionUseCases>,
    @Inject(UsecasesProxyModule.GET_TRANSACTIONS_BY_CUSTOMER_ID_USECASE)
    private readonly getTransactionsByCustomerId: UseCaseProxy<GetTransactionByCustomerIdUseCases>,
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

  @Get()
  getTransactions(@Param('customerId') customerId: number) {
    return this.getTransactionsByCustomerId.getInstance().execute(customerId);
  }
}
