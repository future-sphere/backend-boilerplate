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
      thumbnailImageUrl:
        'https://www.apple.com/v/mac/home/br/images/overview/compare/compare_mbp14_and_16__f2dhysusb5im_large.png',
      subCategory: {
        createMany: {
          data: [
            {
              title: 'MacBook Pro',
            },
            {
              title: 'MacBook Air',
            },
            {
              title: 'MacBook',
            },
            {
              title: 'iMac',
            },
          ],
        },
      },
    },
  });
  const phoneCategory = await prisma.category.create({
    data: {
      title: 'Phones',
      thumbnailImageUrl:
        'https://www.apple.com/v/iphone/home/bk/images/overview/why-iphone/ios16__b66zg2a3322q_large.jpg',
      subCategory: {
        createMany: {
          data: [
            {
              title: 'iPhone 14',
            },
            {
              title: 'iPhone 13',
            },
            {
              title: 'iPhone 12',
            },
          ],
        },
      },
    },
  });
  const tabletCategory = await prisma.category.create({
    data: {
      title: 'Tablets',
      thumbnailImageUrl:
        'https://www.apple.com/v/ipad/home/cc/images/overview/hero/ipad_hero__d0tgmaq6shm6_large.jpg',
      subCategory: {
        createMany: {
          data: [
            {
              title: 'iPad Pro',
            },
            {
              title: 'iPad Air',
            },
            {
              title: 'iPad',
            },
          ],
        },
      },
    },
  });
  const accessoriesCategory = await prisma.category.create({
    data: {
      title: 'Accessories',
      thumbnailImageUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/magsafe-202209?wid=2880&hei=960&fmt=jpeg&qlt=90&.v=1666047384972',
      subCategory: {
        createMany: {
          data: [
            {
              title: 'Magsafe',
            },
            {
              title: 'AirPods',
            },
            {
              title: 'Apple Watch',
            },
          ],
        },
      },
    },
  });

  const iPhoneCategory = await prisma.subCategory.findFirst({
    where: {
      title: 'iPhone 14',
    },
  });

  // Create a product for iPhone 14, priced at whatever you want and with how many ever quantity you want
  const dummyProduct = await prisma.product.create({
    data: {
      title: 'iPhone 14',
      price: 1999,
      quantity: 1000,
      description: 'The best iPhone ever',
      subCategory: {
        connect: {
          id: iPhoneCategory?.id,
        },
      },
      thumbnailImage:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-compare-iphone-14-202209?wid=364&hei=508&fmt=jpeg&qlt=90&.v=1660759995969',
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

  const macbookProSubCategory = await prisma.subCategory.findFirst({
    where: {
      title: 'MacBook Pro',
    },
  });

  const ipadProSubCategory = await prisma.subCategory.findFirst({
    where: {
      title: 'iPad Pro',
    },
  });

  const appleWatchSubCategory = await prisma.subCategory.findFirst({
    where: {
      title: 'Apple Watch',
    },
  });

  const products = await prisma.product.createMany({
    data: [
      {
        title: 'MacBook Pro 2021',
        price: 2999,
        quantity: 1000,
        subCategoryId: macbookProSubCategory?.id,
        thumbnailImage:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1664497359481',
      },
      {
        title: 'iPad Pro 2021',
        price: 999,
        quantity: 1000,
        subCategoryId: ipadProSubCategory?.id,
        thumbnailImage:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-comp-pro-202210?wid=338&hei=386&fmt=jpeg&qlt=90&.v=1664411153112',
      },
      {
        title: 'Apple Watch Series 7',
        price: 599,
        quantity: 1000,
        subCategoryId: appleWatchSubCategory?.id,
        thumbnailImage:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQE23ref_VW_34FR+watch-49-titanium-ultra_VW_34FR_WF_CO+watch-face-49-alpine-ultra_VW_34FR_WF_CO?wid=375&hei=356&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1660713657930%2C1660927566964%2C1660927563656',
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
