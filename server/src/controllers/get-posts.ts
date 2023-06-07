import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { Post } from '../models/Post';

const getPostsRoute = async (req: Request, res: Response) => {
  // Get query params skip and limit
  const skip = parseInt(req.query.skip as string);
  const limit = parseInt(req.query.limit as string);

  // if no query params are provided, return all posts
  if (!skip && !limit) {
    const posts = await Post.find({}).sort({ createdAt: -1 }).populate('userId');
    res.send(posts);
    return;
  }

  if (isNaN(skip) || isNaN(limit)) {
    throw new BadRequestError('Invalid query params');
  }

  // if query params are provided, return posts with pagination sorted by date, newest first
  const posts = await Post.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('userId');

  res.send(posts);
};

export { getPostsRoute };
