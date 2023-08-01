import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/usersRepository';
import UserTokensRepository from '../typeorm/repositories/userTokenRepository';
import EtheralMail from '@config/mail/etheralMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await userTokenRepository.generate(user.id);

    //console.log(token);

    await EtheralMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}, seu token para recuperação de senha é: {{token}}`,
        variables: {
          name: user.name,
          token: token.token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
