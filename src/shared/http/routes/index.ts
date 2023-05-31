import { Router } from 'express';
import productsRouter from '@modules/products/routes/productRoutes';
import usersRouter from '@modules/users/routes/userRoutes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
