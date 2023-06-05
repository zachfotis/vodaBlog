import { Request, Response } from 'express';

const signoutRoute = (req: Request, res: Response) => {
  req.session = null;

  res.send({});
};

export { signoutRoute };
