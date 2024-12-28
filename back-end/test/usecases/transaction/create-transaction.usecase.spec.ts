import { BadRequestException } from '@nestjs/common';
import { MachineCoinAndBanknoteRepository } from 'infrastructure/repositories/machine-coin-and-banknote.repository';
import { ILogger } from 'src/domain/config/logger.interface';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';
import { ProductMachineRepository } from 'src/infrastructure/repositories/product-machine.repository';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';
import { CreateTransactionUseCases } from 'src/usecases/transaction/create-transaction.usecase';
import { GetCoinBanknoteByMachineIdUseCases } from 'usecases/machine/get-coin-banknote-by-machine-id';

describe('CreateTransactionUseCases', () => {
  let mockLogger: ILogger;
  let mockProductRepository: Partial<ProductRepository>;
  let mockTransactionRepository: Partial<TransactionRepository>;
  let mockProductMachineRepository: Partial<ProductMachineRepository>;
  let mockCustomerRepository: Partial<CustomerRepository>;
  let mockMachineCoinAndBanknoteRepository: Partial<MachineCoinAndBanknoteRepository>;
  let getCoinBanknoteByMachineIdUseCases: Partial<GetCoinBanknoteByMachineIdUseCases>;
  let useCase: CreateTransactionUseCases;

  beforeEach(() => {
    mockLogger = { log: jest.fn() } as unknown as ILogger;
    mockProductRepository = {
      getProduct: jest.fn(),
      updateProduct: jest.fn(),
    };
    mockTransactionRepository = {
      createTransaction: jest.fn(),
    };
    mockProductMachineRepository = {
      getProductMachineByProductId: jest.fn(),
    };
    mockCustomerRepository = {
      getCustomerById: jest.fn(),
    };
    mockMachineCoinAndBanknoteRepository = {
      updateQuantity: jest.fn(),
    };
    getCoinBanknoteByMachineIdUseCases = {
      execute: jest.fn().mockReturnValue([
        {
          id: 1,
          machineId: 1,
          coinAndBanknoteId: 1,
          quantity: 2,
          coinAndBanknote: {
            id: 1,
            type: 'COIN',
            denomination: '1.00',
          },
        },
      ]),
    };
    useCase = new CreateTransactionUseCases(
      mockLogger,
      mockProductRepository as ProductRepository,
      mockTransactionRepository as TransactionRepository,
      mockProductMachineRepository as ProductMachineRepository,
      mockCustomerRepository as CustomerRepository,
      mockMachineCoinAndBanknoteRepository as MachineCoinAndBanknoteRepository,
      getCoinBanknoteByMachineIdUseCases as GetCoinBanknoteByMachineIdUseCases,
    );
  });

  it('should create transaction successfully when all validations pass', async () => {
    const mockProduct = { id: 1, stockQuantity: 5, price: 1 };
    const mockProductMachine = { id: 1, productId: 1, machineId: 1 };
    const mockCustomer = { id: 1 };

    mockProductRepository.getProduct = jest.fn().mockResolvedValue(mockProduct);
    mockProductRepository.updateProduct = jest
      .fn()
      .mockResolvedValue(mockProduct);
    mockTransactionRepository.createTransaction = jest
      .fn()
      .mockResolvedValue({ id: 1, status: 'SUCCESS' });
    mockProductMachineRepository.getProductMachineByProductId = jest
      .fn()
      .mockResolvedValue(mockProductMachine);
    mockCustomerRepository.getCustomerById = jest
      .fn()
      .mockResolvedValue(mockCustomer);

    const payload = {
      customerId: 1,
      changeAmount: 1,
      paidAmount: 2,
      productId: 1,
      changeCoin: { 1: 1 },
    };
    const result = await useCase.execute(payload);

    expect(result).toBeDefined();
    expect(result.status).toBe('SUCCESS');
    expect(mockProductRepository.updateProduct).toHaveBeenCalled();
    expect(mockTransactionRepository.createTransaction).toHaveBeenCalled();
  });

  it('should throw BadRequestException when product is not found', async () => {
    mockProductRepository.getProduct = jest.fn().mockResolvedValue(null);

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
      changeCoin: { 1: 1 },
    };

    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
    await expect(useCase.execute(payload)).rejects.toThrow('Product not found');
  });

  it('should update product stock quantity when transaction is successful', async () => {
    const mockProduct = { id: 1, stockQuantity: 5 };
    const mockProductMachine = { id: 1, productId: 1 };
    const mockCustomer = { id: 1 };

    mockProductRepository.getProduct = jest.fn().mockResolvedValue(mockProduct);
    mockProductRepository.updateProduct = jest
      .fn()
      .mockResolvedValue(mockProduct);
    mockTransactionRepository.createTransaction = jest
      .fn()
      .mockResolvedValue({ id: 1, status: 'SUCCESS' });
    mockProductMachineRepository.getProductMachineByProductId = jest
      .fn()
      .mockResolvedValue(mockProductMachine);
    mockCustomerRepository.getCustomerById = jest
      .fn()
      .mockResolvedValue(mockCustomer);

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
      changeCoin: { 1: 1 },
    };
    await useCase.execute(payload);

    expect(mockProductRepository.updateProduct).toHaveBeenCalledWith(1, {
      ...mockProduct,
      stockQuantity: 4,
    });
  });

  it('should return created transaction with all required fields when inputs are valid', async () => {
    const mockProduct = { id: 1, stockQuantity: 5, price: 1 };
    const mockProductMachine = { id: 1, productId: 1 };
    const mockCustomer = { id: 1 };

    mockProductRepository.getProduct = jest.fn().mockResolvedValue(mockProduct);
    mockProductRepository.updateProduct = jest
      .fn()
      .mockResolvedValue(mockProduct);
    mockTransactionRepository.createTransaction = jest.fn().mockResolvedValue({
      id: 1,
      status: 'SUCCESS',
      salesQuantity: 1,
      changeAmount: 10,
      paidAmount: 100,
      stockQuantity: 4,
      customer: mockCustomer,
      productMachine: mockProductMachine,
    });
    mockProductMachineRepository.getProductMachineByProductId = jest
      .fn()
      .mockResolvedValue(mockProductMachine);
    mockCustomerRepository.getCustomerById = jest
      .fn()
      .mockResolvedValue(mockCustomer);

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
      changeCoin: { 1: 1 },
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

  it('should throw BadRequestException when product is out of stock', async () => {
    const mockProduct = { id: 1, stockQuantity: 0 };
    mockProductRepository.getProduct = jest.fn().mockResolvedValue(mockProduct);

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
      changeCoin: { 1: 1 },
    };

    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when product machine is not found', async () => {
    const mockProduct = { id: 1, stockQuantity: 5 };
    const mockCustomer = { id: 1 };

    mockProductRepository.getProduct = jest.fn().mockResolvedValue(mockProduct);
    mockProductMachineRepository.getProductMachineByProductId = jest
      .fn()
      .mockResolvedValue(null);
    mockCustomerRepository.getCustomerById = jest
      .fn()
      .mockResolvedValue(mockCustomer);

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
      changeCoin: { 1: 1 },
    };

    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when customer is not found', async () => {
    const mockProduct = { id: 1, stockQuantity: 5 };
    const mockProductMachine = { id: 1, productId: 1 };

    mockProductRepository.getProduct = jest.fn().mockResolvedValue(mockProduct);
    mockProductMachineRepository.getProductMachineByProductId = jest
      .fn()
      .mockResolvedValue(mockProductMachine);
    mockCustomerRepository.getCustomerById = jest.fn().mockResolvedValue(null);

    const payload = {
      customerId: 1,
      changeAmount: 10,
      paidAmount: 100,
      productId: 1,
      changeCoin: { 1: 1 },
    };

    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
  });
  it('should update coin and banknote quantity when transaction is successful', async () => {
    const mockProduct = { id: 1, stockQuantity: 5, price: 1 };
    const mockProductMachine = { id: 1, productId: 1, machineId: 1 };
    const mockCustomer = { id: 1 };

    mockProductRepository.getProduct = jest.fn().mockResolvedValue(mockProduct);
    mockProductRepository.updateProduct = jest
      .fn()
      .mockResolvedValue(mockProduct);
    mockTransactionRepository.createTransaction = jest
      .fn()
      .mockResolvedValue({ id: 1, status: 'SUCCESS' });
    mockProductMachineRepository.getProductMachineByProductId = jest
      .fn()
      .mockResolvedValue(mockProductMachine);
    mockCustomerRepository.getCustomerById = jest
      .fn()
      .mockResolvedValue(mockCustomer);

    const payload = {
      customerId: 1,
      changeAmount: 1,
      paidAmount: 2,
      productId: 1,
      changeCoin: { 1: 1 },
    };
    await useCase.execute(payload);

    expect(
      mockMachineCoinAndBanknoteRepository.updateQuantity,
    ).toHaveBeenCalledWith(1, 1, 1);
  });
});
