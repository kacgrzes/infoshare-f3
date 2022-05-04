import { Request, Response } from 'express';
import { usersService } from './users.service';

export const usersController = {
  signUp: async (req: Request, res: Response) => {
    try {
      const newUser = await usersService.createUser({
        username: req.body.username,
        password: req.body.password,
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
};
