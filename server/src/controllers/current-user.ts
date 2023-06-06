import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { User } from '../models/User';

const currentUserRoute = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.send({ currentUser: null });
  }

  const { email } = req.currentUser;

  if (!email) {
    return res.send({ currentUser: null });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }
  res.send({ currentUser: existingUser });
};

export { currentUserRoute };
