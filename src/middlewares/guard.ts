import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const secretKey = process.env.JWT_SECRET;

export const guard = (req: Request, res: Response, next: NextFunction) => {
  if (!secretKey) {
    return res.status(500).json({ message: 'Missing JWT secret key' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  try {
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
