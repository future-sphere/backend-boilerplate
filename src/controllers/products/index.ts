import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

// Create a controller that gets all products from a category
export const getAllProductsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const products = await prisma.product.findMany({
    where: {
      categoryId,
    },
  });
  res.json(products);
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      category: true,
      subCategory: true,
      reviews: {
        include: {
          student: true,
        },
      },
      productHighlights: true,
    },
  });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, price, quantity, categoryId, slug } = req.body;
  const product = await prisma.product.create({
    data: {
      title,
      slug,
      price: Number(price),
      quantity: Number(quantity),
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  const foundProduct = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!foundProduct) {
    return res.json({
      message: 'Product does not exist',
    });
  }

  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, title, price, quantity } = req.body;
  const foundProduct = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!foundProduct) {
    return res.json({
      message: 'Product does not exist',
    });
  }
  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      price: Number(price),
      quantity: Number(quantity),
    },
  });
  res.json(product);
};
