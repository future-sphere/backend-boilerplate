import { Request, Response } from 'express';
import { prisma } from '../..';

export const createReview = async (req: Request, res: Response) => {
  const { productId, rating, comment } = req.body;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });
  if (!product) {
    return res.json({
      message: 'Product does not exist',
    });
  }
  // move this code after we finish user login
  const randomStudent = await prisma.student.findFirst();
  if (!randomStudent) {
    return res.json({
      message: 'Student does not exist',
    });
  }
  // move this code after we finish user login

  const review = await prisma.review.create({
    data: {
      rating: Number(rating),
      comment,
      product: {
        connect: {
          id: Number(productId),
        },
      },
      student: {
        connect: {
          id: randomStudent.id,
        },
      },
    },
  });
  res.json(review);
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await prisma.review.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(review);
};
