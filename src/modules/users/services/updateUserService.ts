import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/usersRepository';
import AppError from '@shared/errors/appError';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already used.');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
