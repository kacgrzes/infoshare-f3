import * as bcrypt from 'bcrypt';
import { prisma } from '../prisma';

export const usersService = {
  createUser: async ({ username, password, name }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
    });

    return newUser;
  },
  getAllUsers: async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });

    return users;
  },
};
