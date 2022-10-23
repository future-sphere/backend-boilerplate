import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const seeding = async (prisma: PrismaClient) => {
  console.log('Seeding start...');
  const dummyStudent = await prisma.student.create({
    data: {
      firstName: 'Kevin',
      lastName: 'Zhang',
      age: 10,
      grade: 'A',
      email: 'kevin.zhang@example.com',
      password: '123456',
    },
  });

  // Create some dummy category here:
  // Laptops, Phones, Tablets, Accessories.

  const laptopCategory = await prisma.category.create({
    data: {
      title: 'Laptops',
    },
  });
  const phoneCategory = await prisma.category.create({
    data: {
      title: 'Phones',
    },
  });
  const tabletCategory = await prisma.category.create({
    data: {
      title: 'Tablets',
    },
  });
  const accessoriesCategory = await prisma.category.create({
    data: {
      title: 'Accessories',
    },
  });

  // Create a product for iPhone 14, priced at whatever you want and with how many ever quantity you want
  const dummyProduct = await prisma.product.create({
    data: {
      title: 'iPhone 14',
      price: 1999,
      quantity: 1000,
      category: {
        connect: {
          id: phoneCategory.id,
        },
      },
    },
  });

  const order = await prisma.order.create({
    data: {
      student: {
        connect: {
          id: dummyStudent.id,
        },
      },
      products: {
        connect: [
          {
            id: dummyProduct.id,
          },
        ],
      },
    },
  });
};
