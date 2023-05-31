import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/usersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
