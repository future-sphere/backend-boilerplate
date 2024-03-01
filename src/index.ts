import { Prisma, PrismaClient } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import baseRouter from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const prisma = new PrismaClient();
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
);
app.use(cookieParser());
app.use(baseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.json({
    error: err.message,
  });
});

const server = app.listen(8888, () =>
  console.log(`
🚀 Server ready at: http://localhost:8888
⭐️ Happy hacking!`),
);
