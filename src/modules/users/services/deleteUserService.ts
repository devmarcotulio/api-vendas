import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/usersRepository';
import AppError from '@shared/errors/appError';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);

    const users = await userRepository.findById(id);

    if (!users) {
      throw new AppError('User not found.');
    }

    await userRepository.remove(users);
  }
}

export default DeleteUserService;
