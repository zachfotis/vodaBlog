import { Request, Response } from 'express';
import { Post } from '../models/Post';

const getPostsRoute = async (req: Request, res: Response) => {
  const posts = await Post.find({}).populate('userId');
  res.send(posts);
};

export { getPostsRoute };
