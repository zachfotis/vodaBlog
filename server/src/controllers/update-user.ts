import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { User } from '../models/User';

const updateUserRoute = async (req: Request, res: Response) => {
  const { address, company, phone, website } = req.body;

  if (!address || !company || !phone || !website) {
    throw new BadRequestError('Invalid Data');
  }

  // Check if address is of type Address
  if (address) {
    const { street, suite, city, zipcode, geo } = address;

    if (!street || !suite || !city || !zipcode || !geo) {
      throw new BadRequestError('Invalid Address');
    }

    const { lat, lng } = geo;

    if (!lat || !lng) {
      throw new BadRequestError('Invalid Data');
    }
  }

  // Check if company is of type Company
  if (company) {
    const { name, catchPhrase, bs } = company;

    if (!name || !catchPhrase || !bs) {
      throw new BadRequestError('Invalid Data');
    }
  }

  const { email } = req.currentUser!;

  if (!email) {
    throw new BadRequestError('Invalid credentials');
  }

  // Find and update user
  const user = await User.findOneAndUpdate({ email }, { address, company, phone, website }, { new: true });

  if (!user) {
    throw new BadRequestError('Invalid credentials');
  }

  res.status(200).send(user);
};

export { updateUserRoute };
