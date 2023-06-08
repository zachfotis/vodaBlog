import express from 'express';
import { body, param } from 'express-validator';
import { deletePostRoute } from '../controllers/delete-post';
import { getLikedPostsRoute } from '../controllers/get-liked-posts';
import { getPostsRoute } from '../controllers/get-posts';
import { likePostRoute } from '../controllers/like-post';
import { getMyPosts } from '../controllers/my-posts';
import { newPostRoute } from '../controllers/new-post';
import { getSpecificPostsRoute } from '../controllers/specific-posts';
import { unlikeAllPostsRoute } from '../controllers/unlike-all-posts';
import { currentUser, requireAuth, validateRequest } from '../middlewares';

const router = express.Router();

// VALIDATIONS
const specificPostsValidation = [
  param('num').not().isEmpty().withMessage('Value is required'),
  param('num').isNumeric().withMessage('Value must be a number'),
];

const newPostValidation = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('body').not().isEmpty().withMessage('Body is required'),
  body('category').not().isEmpty().withMessage('Category is required'),
];

const likePostValidation = [body('postId').not().isEmpty().withMessage('Post ID is required')];

const deletePostValidation = [body('postId').not().isEmpty().withMessage('Post ID is required')];

// ROUTES
router.get('/', currentUser, requireAuth, getPostsRoute);
router.get('/specific/:num', currentUser, requireAuth, specificPostsValidation, validateRequest, getSpecificPostsRoute);
router.get('/liked', currentUser, requireAuth, getLikedPostsRoute);
router.put('/unlike-all', currentUser, requireAuth, unlikeAllPostsRoute);
router.get('/my-posts', currentUser, requireAuth, getMyPosts);
router.post('/', currentUser, requireAuth, newPostValidation, validateRequest, newPostRoute);
router.put('/', currentUser, requireAuth, likePostValidation, validateRequest, likePostRoute);
router.delete('/', currentUser, requireAuth, deletePostValidation, validateRequest, deletePostRoute);

export { router as postsRouter };
