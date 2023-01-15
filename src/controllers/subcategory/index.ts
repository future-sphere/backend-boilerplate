import { Request, Response } from 'express';
import { prisma } from '../..';

export const getAllSubcategory = async (req: Request, res: Response) => {
  const data = await prisma.subCategory.findMany();
  res.json(data);
};
