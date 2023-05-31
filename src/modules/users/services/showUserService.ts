import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/usersRepository';
import AppError from '@shared/errors/appError';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.findById(id);

    if (!users) {
      throw new AppError('User not found');
    }

    return users;
  }
}

export default ShowUserService;
