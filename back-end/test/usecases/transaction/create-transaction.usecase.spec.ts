import { BadRequestException } from '@nestjs/common';
import { ILogger } from 'src/domain/config/logger.interface';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';
import { ProductMachineRepository } from 'src/infrastructure/repositories/product-machine.repository';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';
import { CreateTransactionUseCases } from 'src/usecases/transaction/create-transaction.usecase';

describe('CreateTransactionUseCases', () => {
  it('should create transaction successfully when all validations pass', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProduct = {
      id: 1,
      stockQuantity: 5,
    };

    const mockProductMachine = {
      id: 1,
      productId: 1,
    };

    const mockCustomer = {
      id: 1,
    };

    const mockProductRepository = {
      getProduct: jest.fn().mockResolvedValue(mockProduct),
      updateProduct: jest.fn().mockResolvedValue(mockProduct),
    };

    const mockTransactionRepository = {
      createTransaction: jest.fn().mockResolvedValue({
        id: 1,
        status: 'SUCCESS',
      }),
    };

    const mockProductMachineRepository = {
      getProductMachineByProductId: jest
        .fn()
        .mockResolvedValue(mockProductMachine),
    };

    const mockCustomerRepository = {
      getCustomerById: jest.fn().mockResolvedValue(mockCustomer),
    };

    const useCase = new CreateTransactionUseCases(
      mockLogger,
      mockProductRepository as unknown as ProductRepository,
      mockTransactionRepository as unknown as TransactionRepository,
      mockProductMachineRepository as unknown as ProductMachineRepository,
      mockCustomerRepository as unknown as CustomerRepository,
    );

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
    };

    const result = await useCase.execute(payload);

    expect(result).toBeDefined();
    expect(result.status).toBe('SUCCESS');
    expect(mockProductRepository.updateProduct).toHaveBeenCalled();
    expect(mockTransactionRepository.createTransaction).toHaveBeenCalled();
  });
  it('should throw BadRequestException when product is not found', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProductRepository = {
      getProduct: jest.fn().mockResolvedValue(null),
    };

    const mockTransactionRepository = {
      createTransaction: jest.fn(),
    };

    const mockProductMachineRepository = {
      getProductMachineByProductId: jest.fn(),
    };

    const mockCustomerRepository = {
      getCustomerById: jest.fn(),
    };

    const useCase = new CreateTransactionUseCases(
      mockLogger,
      mockProductRepository as unknown as ProductRepository,
      mockTransactionRepository as unknown as TransactionRepository,
      mockProductMachineRepository as unknown as ProductMachineRepository,
      mockCustomerRepository as unknown as CustomerRepository,
    );

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
    };

    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
    await expect(useCase.execute(payload)).rejects.toThrow('Product not found');
  });
  it('should update product stock quantity when transaction is successful', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProduct = {
      id: 1,
      stockQuantity: 5,
    };

    const mockProductMachine = {
      id: 1,
      productId: 1,
    };

    const mockCustomer = {
      id: 1,
    };

    const mockProductRepository = {
      getProduct: jest.fn().mockResolvedValue(mockProduct),
      updateProduct: jest.fn().mockResolvedValue(mockProduct),
    };

    const mockTransactionRepository = {
      createTransaction: jest.fn().mockResolvedValue({
        id: 1,
        status: 'SUCCESS',
      }),
    };

    const mockProductMachineRepository = {
      getProductMachineByProductId: jest
        .fn()
        .mockResolvedValue(mockProductMachine),
    };

    const mockCustomerRepository = {
      getCustomerById: jest.fn().mockResolvedValue(mockCustomer),
    };

    const useCase = new CreateTransactionUseCases(
      mockLogger,
      mockProductRepository as unknown as ProductRepository,
      mockTransactionRepository as unknown as TransactionRepository,
      mockProductMachineRepository as unknown as ProductMachineRepository,
      mockCustomerRepository as unknown as CustomerRepository,
    );

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
    };

    await useCase.execute(payload);

    expect(mockProductRepository.updateProduct).toHaveBeenCalledWith(1, {
      ...mockProduct,
      stockQuantity: 4,
    });
  });
  it('should return created transaction with all required fields when inputs are valid', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProduct = {
      id: 1,
      stockQuantity: 5,
    };

    const mockProductMachine = {
      id: 1,
      productId: 1,
    };

    const mockCustomer = {
      id: 1,
    };

    const mockProductRepository = {
      getProduct: jest.fn().mockResolvedValue(mockProduct),
      updateProduct: jest.fn().mockResolvedValue(mockProduct),
    };

    const mockTransactionRepository = {
      createTransaction: jest.fn().mockResolvedValue({
        id: 1,
        status: 'SUCCESS',
        salesQuantity: 1,
        changeAmount: 10,
        paidAmount: 100,
        stockQuantity: 4,
        customer: mockCustomer,
        productMachine: mockProductMachine,
      }),
    };

    const mockProductMachineRepository = {
      getProductMachineByProductId: jest
        .fn()
        .mockResolvedValue(mockProductMachine),
    };

    const mockCustomerRepository = {
      getCustomerById: jest.fn().mockResolvedValue(mockCustomer),
    };

    const useCase = new CreateTransactionUseCases(
      mockLogger,
      mockProductRepository as unknown as ProductRepository,
      mockTransactionRepository as unknown as TransactionRepository,
      mockProductMachineRepository as unknown as ProductMachineRepository,
      mockCustomerRepository as unknown as CustomerRepository,
    );

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
    };

    const result = await useCase.execute(payload);

    expect(result).toBeDefined();
    expect(result.status).toBe('SUCCESS');
    expect(result.salesQuantity).toBe(1);
    expect(result.changeAmount).toBe(10);
    expect(result.paidAmount).toBe(100);
    expect(result.stockQuantity).toBe(4);
    expect(result.customer).toEqual(mockCustomer);
    expect(result.productMachine).toEqual(mockProductMachine);
    expect(mockProductRepository.updateProduct).toHaveBeenCalled();
    expect(mockTransactionRepository.createTransaction).toHaveBeenCalled();
  });

  // Throws BadRequestException when product is out of stock
  it('should throw BadRequestException when product is out of stock', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProduct = {
      id: 1,
      stockQuantity: 0,
    };

    const mockProductRepository = {
      getProduct: jest.fn().mockResolvedValue(mockProduct),
    };

    const mockTransactionRepository = {
      createTransaction: jest.fn(),
    };

    const mockProductMachineRepository = {
      getProductMachineByProductId: jest.fn(),
    };

    const mockCustomerRepository = {
      getCustomerById: jest.fn(),
    };

    const useCase = new CreateTransactionUseCases(
      mockLogger,
      mockProductRepository as unknown as ProductRepository,
      mockTransactionRepository as unknown as TransactionRepository,
      mockProductMachineRepository as unknown as ProductMachineRepository,
      mockCustomerRepository as unknown as CustomerRepository,
    );

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
    };

    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
  });
  // Throws BadRequestException when product machine is not found
  it('should throw BadRequestException when product machine is not found', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProduct = {
      id: 1,
      stockQuantity: 5,
    };

    const mockCustomer = {
      id: 1,
    };

    const mockProductRepository = {
      getProduct: jest.fn().mockResolvedValue(mockProduct),
      updateProduct: jest.fn(),
    };

    const mockTransactionRepository = {
      createTransaction: jest.fn(),
    };

    const mockProductMachineRepository = {
      getProductMachineByProductId: jest.fn().mockResolvedValue(null),
    };

    const mockCustomerRepository = {
      getCustomerById: jest.fn().mockResolvedValue(mockCustomer),
    };

    const useCase = new CreateTransactionUseCases(
      mockLogger,
      mockProductRepository as unknown as ProductRepository,
      mockTransactionRepository as unknown as TransactionRepository,
      mockProductMachineRepository as unknown as ProductMachineRepository,
      mockCustomerRepository as unknown as CustomerRepository,
    );

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
    };

    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
  });
  // Throws BadRequestException when customer is not found
  it('should throw BadRequestException when customer is not found', async () => {
    const mockLogger = {
      log: jest.fn(),
    } as unknown as ILogger;

    const mockProduct = {
      id: 1,
      stockQuantity: 5,
    };

    const mockProductMachine = {
      id: 1,
      productId: 1,
    };

    const mockProductRepository = {
      getProduct: jest.fn().mockResolvedValue(mockProduct),
      updateProduct: jest.fn(),
    };

    const mockTransactionRepository = {
      createTransaction: jest.fn(),
    };

    const mockProductMachineRepository = {
      getProductMachineByProductId: jest
        .fn()
        .mockResolvedValue(mockProductMachine),
    };

    const mockCustomerRepository = {
      getCustomerById: jest.fn().mockResolvedValue(null),
    };

    const useCase = new CreateTransactionUseCases(
      mockLogger,
      mockProductRepository as unknown as ProductRepository,
      mockTransactionRepository as unknown as TransactionRepository,
      mockProductMachineRepository as unknown as ProductMachineRepository,
      mockCustomerRepository as unknown as CustomerRepository,
    );

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
    };

    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
  });
});
