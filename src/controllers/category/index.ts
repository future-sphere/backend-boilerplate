import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllCategories = async (req: Request, res: Response) => {
  const data = await prisma.category.findMany();
  res.json(data);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });
  res.json(data);
};

export const createCategory = async (req: Request, res: Response) => {
  const { title, slug } = req.body;
  const data = await prisma.category.create({
    data: {
      title,
      slug,
    },
  });
  res.json(data);
};

export const updateCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, thumbnailImageUrl, heroImageUrl } = req.body;
  if (!id) {
    res.status(400).json({ message: 'Missing id' });
  }
  const data = await prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      thumbnailImageUrl,
      heroImageUrl,
    },
  });
  res.json(data);
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: 'Missing id' });
  }
  const data = await prisma.category.delete({
    where: {
      id,
    },
  });
  res.json(data);
};
