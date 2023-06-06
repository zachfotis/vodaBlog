import { Request, Response } from 'express';
import { Post } from '../models/Post';

const getLikedPostsRoute = async (req: Request, res: Response) => {
  const posts = await Post.find({ likes: req.currentUser!.id }).populate('userId');

  res.status(200).send(posts);
};

export { getLikedPostsRoute };
