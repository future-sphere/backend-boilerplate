import { Request, Response } from 'express';
import { prisma } from '../..';

export const getAllSubcategory = async (req: Request, res: Response) => {
  const data = await prisma.subCategory.findMany();
  res.json(data);
};

// get all products from a subcategory
export const getAllProductsBySubcategory = async (
  req: Request,
  res: Response
) => {
  const { slug } = req.params;
  const { search, priceFilters, sorting } = req.query;
  const subCategory = await prisma.subCategory.findFirst({
    where: {
      slug,
    },
  });

  const priceFilterArr = priceFilters as { min: string; max: string }[];

  const sortingArr = sorting as { field: string; order: string }[];

  const productSortingLogic =
    sortingArr && sortingArr.length
      ? sortingArr.map(({ field, order }) => {
          return {
            [field]: order,
          };
        })
      : [
          {
            price: 'asc',
          },
        ];

  const products = await prisma.product.findMany({
    where: {
      AND: [
        {
          title: {
            contains: search as string,
            mode: 'insensitive',
          },
        },
        {
          subCategoryId: subCategory?.id,
        },
        {
          OR:
            priceFilters && priceFilterArr.length > 0
              ? priceFilterArr.map((price: { min: string; max: string }) => ({
                  price: {
                    lte: Number(price.max),
                    gte: Number(price.min),
                  },
                }))
              : undefined,
        },
      ],
    },
    orderBy: productSortingLogic,
  });

  res.json({
    ...subCategory,
    products,
  });
};
