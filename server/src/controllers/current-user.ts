import { Request, Response } from 'express';

const currentUserRoute = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export { currentUserRoute };
