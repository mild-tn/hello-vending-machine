import { ILogger } from 'domain/config/logger.interface';
import { CoinAndBanknoteRepository } from 'infrastructure/repositories/coin-and-banknote.repository';
import { GetCoinBanknoteByTypeUseCases } from 'usecases/coin-and-banknote/get-coin-and-banknote';

describe('GetCoinAndBanknoteUseCase', () => {
  let useCase: GetCoinBanknoteByTypeUseCases;
  let mockCoinAndBanknoteRepo: CoinAndBanknoteRepository;
  let mockLogger: ILogger;

  beforeEach(() => {
    mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    mockCoinAndBanknoteRepo = {
      getCoinAndBanknoteByType: jest.fn().mockReturnValue([
        {
          type: 'COIN',
          denomination: 1,
          quantity: 10,
        },
        {
          type: 'COIN',
          denomination: 2,
          quantity: 20,
        },
      ]),
    } as unknown as CoinAndBanknoteRepository;

    useCase = new GetCoinBanknoteByTypeUseCases(
      mockLogger,
      mockCoinAndBanknoteRepo as CoinAndBanknoteRepository,
    );
  });

  it('should return all coin and banknote', async () => {
    const useCase = new GetCoinBanknoteByTypeUseCases(
      mockLogger,
      mockCoinAndBanknoteRepo as CoinAndBanknoteRepository,
    );

    const result = await useCase.execute('COIN');

    expect(mockLogger.log).toHaveBeenCalledWith(
      'GetCoinBanknoteByTypeUseCases',
      'Get coin and banknote by Type',
    );
    expect(
      mockCoinAndBanknoteRepo.getCoinAndBanknoteByType,
    ).toHaveBeenCalledWith('COIN');
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('COIN');
  });
});
