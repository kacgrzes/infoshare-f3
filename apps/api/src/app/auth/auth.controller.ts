import { Request, Response } from 'express';
import { prisma } from '../prisma';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const authController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    console.log(foundUser.id)
    if (!foundUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const valid = await bcrypt.compare(password, foundUser.password);

    if (!valid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = await jwt.sign(foundUser, 's3cr3t');

    return res.status(200).json({
      token,
    });
  },
};
