import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/Post';

const newPostRoute = async (req: Request, res: Response) => {
  const { title, body, category } = req.body;

  const post = Post.build({
    userId: new mongoose.Types.ObjectId(req.currentUser!.id),
    title,
    body,
    category,
    readTime: Math.floor(body.length / 1000) + 1,
  });

  await post.save();

  res.status(201).send(post);
};

export { newPostRoute };
