import { Router } from 'express';
import productsRouter from '@modules/products/routes/productRoutes';
import usersRouter from '@modules/users/routes/userRoutes';
import sessionsRouter from '@modules/users/routes/sessionsRoutes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
