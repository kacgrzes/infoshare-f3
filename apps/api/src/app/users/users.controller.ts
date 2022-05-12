import { Request, Response } from 'express';
import { usersService } from './users.service';

export const usersController = {
  signUp: async (req: Request, res: Response) => {
    const { username, password, name } = req.body
    try {
      await usersService.createUser({
        username,
        password,
        name,
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

    await usersService.delete(userId)

    return res.status(200).json({
      message: 'User deleted'
    })
  }
};
