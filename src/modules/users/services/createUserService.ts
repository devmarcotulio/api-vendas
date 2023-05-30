import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/appError';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/usersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already used');
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
