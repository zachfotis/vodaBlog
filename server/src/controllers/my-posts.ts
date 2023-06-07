import { Request, Response } from 'express';
import { Post } from '../models/Post';

const getMyPosts = async (req: Request, res: Response) => {
  const posts = await Post.find({ userId: req.currentUser!.id }).populate('userId');

  res.status(200).send(posts);
};

export { getMyPosts };
