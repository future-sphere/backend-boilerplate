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
      description: 'The best iPhone ever',
      category: {
        connect: {
          id: phoneCategory.id,
        },
      },
      thumbnailImage:
        'https://res.cloudinary.com/dtgh01qqo/image/upload/v1670189033/se-adv-2/iphone-14-pro-model-unselect-gallery-1-202209.jpg',
      reviews: {
        createMany: {
          data: [
            {
              rating: 5,
              comment: 'I love this product',
              studentId: dummyStudent.id,
            },
            {
              rating: 4,
              comment: 'I like this product',
              studentId: dummyStudent.id,
            },
          ],
        },
      },
      highlightTitle: 'iPhone 14 Pro',
      highlightDescription: 'The best iPhone ever',
      productHighlights: {
        createMany: {
          data: [
            {
              title: 'A14 Bionic',
              subtitle: 'The fastest chip in a smartphone',
              image:
                'https://res.cloudinary.com/dtgh01qqo/image/upload/v1670189195/se-adv-2/iphone-14-pro-model-unselect-gallery-2-202209_GEO_US.jpg',
            },
            {
              title: 'Pro camera system',
              subtitle: 'The most advanced camera system ever on iPhone',
              image:
                'https://res.cloudinary.com/dtgh01qqo/image/upload/v1670189196/se-adv-2/291-hero.jpg',
            },
          ],
        },
      },
    },
  });

  const products = await prisma.product.createMany({
    data: [
      {
        title: 'MacBook Pro 2021',
        price: 2999,
        quantity: 1000,
        categoryId: laptopCategory.id,
      },
      {
        title: 'iPad Pro 2021',
        price: 999,
        quantity: 1000,
        categoryId: tabletCategory.id,
      },
      {
        title: 'Apple Watch Series 7',
        price: 599,
        quantity: 1000,
        categoryId: accessoriesCategory.id,
      },
    ],
  });

  if (products) {
    console.log(' products created.');
  }

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
