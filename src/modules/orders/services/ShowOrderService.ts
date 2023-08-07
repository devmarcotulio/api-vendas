import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/ordersRepository';
import Order from '../typeorm/entities/order';
import AppError from '@shared/errors/appError';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
