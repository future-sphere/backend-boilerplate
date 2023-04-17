import { Request, Response } from 'express';
import { prisma } from '../..';

// Situations
/*
1. User has no active cart, this is the first time they are adding an item to their cart
2. User has an active cart, this is the first time they are adding an item to their cart, there may be already items in the cart
3. The item they are adding is already in the cart, just update quantity
*/

export const addItemToCart = async (req: Request, res: Response) => {
  const { productId, quantity, userId } = req.body;

  const studentExists = await prisma.student.findUnique({
    where: {
      id: +userId,
    },
  });

  if (!studentExists) {
    return res.status(404).json({ message: 'Student not found' });
  }

  // Create a check to check if the quantity is at least 1, if not, return an error
  // message saying that the quantity must be at least 1
  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: +productId,
    },
  });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const activeCart = await prisma.cart.findFirst({
    where: {
      studentId: +userId,
    },
  });

  let cart;

  if (!activeCart) {
    cart = await prisma.cart.create({
      data: {
        student: {
          connect: {
            id: +userId,
          },
        },
        cartItems: {
          create: {
            product: {
              connect: {
                id: +productId,
              },
            },
            quantity: +quantity,
          },
        },
        createdAt: new Date(),
      },
      include: {
        cartItems: true,
      },
    });
  } else {
    const itemExists = await prisma.cartItem.findFirst({
      where: {
        cartId: activeCart.id,
        productId: +productId,
      },
    });

    if (itemExists) {
      cart = await prisma.cart.update({
        where: {
          id: activeCart.id,
        },
        data: {
          cartItems: {
            update: {
              where: {
                id: itemExists.id,
              },
              data: {
                quantity: {
                  increment: +quantity,
                },
              },
            },
          },
        },
        include: {
          cartItems: true,
        },
      });
    } else {
      cart = await prisma.cart.update({
        where: {
          id: activeCart.id,
        },
        data: {
          cartItems: {
            create: {
              product: {
                connect: {
                  id: +productId,
                },
              },
              quantity: +quantity,
            },
          },
        },
        include: {
          cartItems: true,
        },
      });
    }
  }

  return res.json(cart);
};

export const updateCartItemQuantity = async (req: Request, res: Response) => {
  const { cartItemId, quantity } = req.body;

  if (quantity < 0) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id: +cartItemId,
    },
  });

  if (!cartItem) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  const cart = await prisma.cart.update({
    where: {
      id: cartItem.cartId,
    },
    data: {
      cartItems:
        quantity === 0
          ? {
              delete: {
                id: +cartItemId,
              },
            }
          : {
              update: {
                where: {
                  id: +cartItemId,
                },
                data: {
                  quantity: +quantity,
                },
              },
            },
    },
    include: {
      cartItems: true,
    },
  });

  return res.json(cart);
};

// Write a controller that takes in a cartId and returns the cart with all the cart items
export const getCartByStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cart = await prisma.cart.findFirst({
    where: {
      studentId: +id,
    },
    include: {
      cartItems: true,
    },
  });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  return res.json(cart);
};
