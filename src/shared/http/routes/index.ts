import { Router } from 'express';
import productsRouter from '@modules/products/routes/productRoutes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
