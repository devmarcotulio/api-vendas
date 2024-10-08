import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/usersRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import UsersTokenRepository from '../typeorm/repositories/usersTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UsersTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}

export default ResetPasswordService;
