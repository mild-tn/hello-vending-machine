import { ILogger } from 'src/domain/config/logger.interface';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';
import { GetTransactionByCustomerIdUseCases } from 'src/usecases/transaction/get-transaction-by-customer-id.usecase';

describe('GetTransactionByCustomerIdUseCases', () => {
  // Returns transactions array when valid customer ID is provided
  it('should return transactions array when valid customer ID is provided', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockTransactions = [
      { id: 1, customerId: 123, amount: 100 },
      { id: 2, customerId: 123, amount: 200 },
    ];

    const mockTransactionRepository = {
      getTransactionByCustomerId: jest.fn().mockResolvedValue(mockTransactions),
    } as unknown as TransactionRepository;

    const useCase = new GetTransactionByCustomerIdUseCases(
      mockLogger,
      mockTransactionRepository,
    );

    const result = await useCase.execute(123);

    expect(
      mockTransactionRepository.getTransactionByCustomerId,
    ).toHaveBeenCalledWith(123);
    expect(result).toEqual(mockTransactions);
  });
  // Handles invalid customer ID (negative numbers, zero)
  it('should return empty array when invalid customer ID is provided', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockTransactionRepository = {
      getTransactionByCustomerId: jest.fn().mockResolvedValue([]),
    } as unknown as TransactionRepository;

    const useCase = new GetTransactionByCustomerIdUseCases(
      mockLogger,
      mockTransactionRepository,
    );

    const result = await useCase.execute(-1);

    expect(
      mockTransactionRepository.getTransactionByCustomerId,
    ).toHaveBeenCalledWith(-1);
    expect(result).toEqual([]);
  });
});
