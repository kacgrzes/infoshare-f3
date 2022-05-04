import { Request, Response } from "express"

export const tweetsController = {
  getAll: async (req: Request, res: Response) => {
    return res.status(200).json({
      hello: "world"
    })
  },
};
