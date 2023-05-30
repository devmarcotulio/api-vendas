import { Request, Response } from 'express';
import ListUserService from '../services/listUserService';
import CreateUserService from '../services/createUserService';
import UpdateUserService from '../services/updateUserService';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = createUser.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateUser = new UpdateUserService();

    const user = updateUser.execute({
      id,
      name,
      email,
      password,
    });

    return res.json(user);
  }
}
