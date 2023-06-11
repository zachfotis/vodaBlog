import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/Post';

const unlikeAllPostsRoute = async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.currentUser!.id);

  const posts = await Post.find({ likes: userId }).populate('userId');

  posts.forEach(async (post) => {
    const index = post.likes.indexOf(userId);
    post.likes.splice(index, 1);
    await post.save();
  });

  res.status(200).send(posts);
};

export { unlikeAllPostsRoute };
