import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orders = await prisma.order.findMany({
    where: {
      studentId: Number(id),
    },
    include: {
      student: true,
    },
  });
  res.json(orders);
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      student: true,
    },
  });
  res.json(order);
};

export const createOrder = async (req: Request, res: Response) => {
  const {
    studentId,
    cartId,
    shippingAddressStreet,
    shippingAddressCity,
    shippingAddressState,
    shippingAddressPostalCode,
    subtotal,
    tax,
  } = req.body;

  const order = await prisma.order.create({
    data: {
      student: {
        connect: {
          id: Number(studentId),
        },
      },
      cart: {
        connect: {
          id: Number(cartId),
        },
      },
      shippingAddress: {
        create: {
          streetAddress: shippingAddressStreet,
          city: shippingAddressCity,
          state: shippingAddressState,
          zipCode: shippingAddressPostalCode,
        },
      },
      subtotal: Number(subtotal),
      tax: Number(tax),
    },
    include: {
      student: true,
    },
  });
  res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.body;
  const order = await prisma.order.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(order);
};

export const updateOrder = async (req: Request, res: Response) => {
  const { studentId, products, id } = req.body;
  const foundOrder = await prisma.order.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!foundOrder) {
    return res.json({
      message: 'Order does not exist',
    });
  }
  const order = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      student: {
        connect: {
          id: Number(studentId),
        },
      },
    },
    include: {
      student: true,
    },
  });
  res.json(order);
};
