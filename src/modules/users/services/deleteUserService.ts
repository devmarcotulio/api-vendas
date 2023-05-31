import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/usersRepository';
import AppError from '@shared/errors/appError';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.findById(id);

    if (!users) {
      throw new AppError('User not found');
    }

    await usersRepository.delete(users);
  }
}

export default DeleteUserService;
