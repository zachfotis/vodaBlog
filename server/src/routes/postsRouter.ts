import express from 'express';
import { body } from 'express-validator';
import { deletePostRoute } from '../controllers/delete-post';
import { getLikedPostsRoute } from '../controllers/get-liked-posts';
import { getPostsRoute } from '../controllers/get-posts';
import { likePostRoute } from '../controllers/like-post';
import { newPostRoute } from '../controllers/new-post';
import { currentUser, requireAuth } from '../middlewares';

const router = express.Router();

// VALIDATIONS
const newPostValidation = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('body').not().isEmpty().withMessage('Body is required'),
  body('category').not().isEmpty().withMessage('Category is required'),
];

const likePostValidation = [body('postId').not().isEmpty().withMessage('Post ID is required')];

const deletePostValidation = [body('postId').not().isEmpty().withMessage('Post ID is required')];

// ROUTES
router.get('/', currentUser, requireAuth, getPostsRoute);
router.get('/liked', currentUser, requireAuth, getLikedPostsRoute);
router.post('/', currentUser, requireAuth, newPostValidation, newPostRoute);
router.put('/', currentUser, requireAuth, likePostValidation, likePostRoute);
router.delete('/', currentUser, requireAuth, deletePostValidation, deletePostRoute);

export { router as postsRouter };
