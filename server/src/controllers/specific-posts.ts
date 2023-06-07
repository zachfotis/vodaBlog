import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { Post } from '../models/Post';

const getSpecificPostsRoute = async (req: Request, res: Response) => {
  const { num } = req.params;

  // Check if num is a number
  if (isNaN(parseInt(num))) {
    throw new BadRequestError('Value must be a number');
  }

  // Sort by date, most recent first and get the first num posts
  const posts = await Post.find({}).sort({ createdAt: -1 }).limit(parseInt(num)).populate('userId');

  res.status(200).send(posts);
};

export { getSpecificPostsRoute };
