import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  private readonly repository: Repository<Customer>;
  constructor(private readonly dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(Customer);
  }

  getCustomerById(id: number): Promise<Customer> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }
}
