import { Request, Response } from 'express';
import { prisma } from '../..';

export const getAllSubcategory = async (req: Request, res: Response) => {
  const data = await prisma.subCategory.findMany();
  res.json(data);
};

// get all products from a subcategory
export const getAllProductsBySubcategory = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const products = await prisma.subCategory.findFirst({
    where: {
      slug,
    },
    include: {
      products: true,
    },
  });
  res.json(products);
}