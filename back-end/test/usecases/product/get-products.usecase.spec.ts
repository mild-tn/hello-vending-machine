import { ILogger } from 'src/domain/config/logger.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';
import { GetProductsUseCases } from 'src/usecases/product/get-products.usecase';

describe('GetProductsUseCases', () => {
  it('should return products in ascending ID order when executed successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProductRepository = {
      getProducts: jest.fn().mockResolvedValue(mockProducts),
    } as unknown as ProductRepository;

    const useCase = new GetProductsUseCases(mockLogger, mockProductRepository);

    const result = await useCase.execute();

    expect(mockProductRepository.getProducts).toHaveBeenCalled();
    expect(mockLogger.log).toHaveBeenCalledWith(
      'GetProductsUseCases',
      'Get products',
    );
    expect(result).toEqual(mockProducts);
  });
  it('should throw error when database connection fails', async () => {
    const dbError = new Error('Database connection failed');

    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProductRepository = {
      getProducts: jest.fn().mockRejectedValue(dbError),
    } as unknown as ProductRepository;

    const useCase = new GetProductsUseCases(mockLogger, mockProductRepository);

    await expect(useCase.execute()).rejects.toThrow(dbError);
    expect(mockProductRepository.getProducts).toHaveBeenCalled();
    expect(mockLogger.log).toHaveBeenCalledWith(
      'GetProductsUseCases',
      'Get products',
    );
  });
});
