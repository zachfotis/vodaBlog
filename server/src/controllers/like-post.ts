import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/Post';

const likePostRoute = async (req: Request, res: Response) => {
  const { postId } = req.body;

  const post = await Post.findById(postId).populate('userId');

  if (!post) {
    throw new Error('Post not found');
  }

  const userId = new mongoose.Types.ObjectId(req.currentUser!.id);
  const index = post.likes.indexOf(userId);

  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();

  res.status(200).send(post);
};

export { likePostRoute };
