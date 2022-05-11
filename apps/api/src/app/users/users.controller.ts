import { Request, Response } from 'express';
import { usersService } from './users.service';
import { prisma } from '../prisma'

export const usersController = {
  signUp: async (req: Request, res: Response) => {
    try {
      await usersService.createUser({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
      });
      return res.status(200).json({
        message: 'User was signed up successfully',
      });
    } catch (err) {
      return res.status(409).json({
        message: 'Username already taken',
      });
    }
  },
  getAll: async (req: Request, res: Response) => {
    const users = await usersService.getAllUsers();
    return res.status(200).json({ users });
  },
  delete: async (req: Request, res: Response) => {
    const user = req.user
    const userId = req.params.userId

    if (user.role === 'user') {
      return res.status(401).json({
        message: 'Cannot delete account'
      })
    }

    await prisma.user.delete({
      where: {
        id: userId
      }
    })

    return res.status(200).json({
      message: 'User deleted'
    })
  }
};
