import { Request, Response } from 'express';
import ListCustomerService from '../services/listCustomerService';
import ShowCustomerService from '../services/showCustomerService';
import CreateCustomerService from '../services/createCustomerService';
import DeleteCustomerService from '../services/deleteCustomerService';
import UpdateCustomerService from '../services/updateCustomerService';

class CustomersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();

    const customers = await listCustomers.execute();

    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return res.json([]);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateCustomer = new UpdateCustomerService();

    const customer = updateCustomer.execute({
      id,
      name,
      email,
    });

    return res.json(customer);
  }
}

export default CustomersController;