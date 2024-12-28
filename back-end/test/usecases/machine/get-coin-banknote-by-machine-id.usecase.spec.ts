import { ILogger } from 'domain/config/logger.interface';
import { MachineCoinAndBanknoteRepository } from 'infrastructure/repositories/machine-coin-and-banknote.repository';
import { GetCoinBanknoteByMachineIdUseCases } from 'usecases/machine/get-coin-banknote-by-machine-id';

describe('GetCoinBanknoteByMachineIdUseCase', () => {
  it('should return coin and banknote data when valid machine ID is provided', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockMachineCoinAndBanknoteRepo = {
      getCoinAndBanknoteByMachineId: jest.fn().mockResolvedValue([
        { machineId: 1, coinAndBanknoteId: 1, quantity: 10 },
        { machineId: 1, coinAndBanknoteId: 2, quantity: 20 },
      ]),
    } as Partial<MachineCoinAndBanknoteRepository>;

    const useCase = new GetCoinBanknoteByMachineIdUseCases(
      mockLogger,
      mockMachineCoinAndBanknoteRepo as MachineCoinAndBanknoteRepository,
    );

    const result = await useCase.execute(1);

    expect(mockLogger.log).toHaveBeenCalledWith(
      'GetCoinBanknoteByMachineIdUseCases',
      'Get coin and banknote by machine id',
    );
    expect(
      mockMachineCoinAndBanknoteRepo.getCoinAndBanknoteByMachineId,
    ).toHaveBeenCalledWith(1);
    expect(result).toHaveLength(2);
    expect(result[0].machineId).toBe(1);
  });
});
