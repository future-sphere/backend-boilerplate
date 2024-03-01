import { prisma } from '../../index';

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
