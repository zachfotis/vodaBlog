import { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError } from '../errors';
import { Post } from '../models/Post';

const deletePostRoute = async (req: Request, res: Response) => {
  const { postId } = req.body;

  // Check if post exists
  const post = await Post.findById(postId);

  if (!post) {
    throw new NotFoundError();
  }

  // Check if user is the owner of the post
  if (post.userId.valueOf() !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  // Delete post
  await Post.findByIdAndDelete(postId);

  res.status(200).send(post);
};

export { deletePostRoute };
