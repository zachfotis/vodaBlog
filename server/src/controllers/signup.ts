import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/index';
import { User } from '../models/User';

const signupRoute = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Check if email is already in use
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  // Create a new user
  const user = User.build({ email, password, name });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_KEY!);

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(user);
};

export { signupRoute };
