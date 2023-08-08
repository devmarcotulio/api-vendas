import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import { pagination } from 'typeorm-pagination';
import AppError from '@shared/errors/appError';
import '@shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);

app.use(routes);
app.use(errors());
app.use('/files', express.static(uploadConfig.directory));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error.',
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'error.',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  console.log('Server running on port 3333');
});
