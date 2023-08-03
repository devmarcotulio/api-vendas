import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/customersRepository';
import AppError from '@shared/errors/appError';
import Customer from '../typeorm/entities/costumer';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer | undefined> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
