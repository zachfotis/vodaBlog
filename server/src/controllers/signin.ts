import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/index';
import { User } from '../models/User';
import { Password } from '../services/password';

const signinRoute = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate JWT
  const userJwt = jwt.sign(
    { id: existingUser.id, email: existingUser.email, name: existingUser.name },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existingUser);
};

export { signinRoute };
