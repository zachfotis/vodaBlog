import express from 'express';
import { body } from 'express-validator';
import { currentUserRoute } from '../controllers/current-user';
import { signinRoute } from '../controllers/signin';
import { signoutRoute } from '../controllers/signout';
import { signupRoute } from '../controllers/signup';
import { updateUserRoute } from '../controllers/update-user';
import { currentUser, requireAuth } from '../middlewares';
import { validateRequest } from '../middlewares/index';

const router = express.Router();

// VALIDATIONS
const signinValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password'),
];

const signupValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters'),
  body('name').trim().notEmpty().withMessage('You must supply a name'),
];

const updateValidation = [
  body('address').notEmpty().withMessage('You must supply an address'),
  body('company').notEmpty().withMessage('You must supply a company'),
  body('phone').trim().notEmpty().withMessage('You must supply a phone'),
  body('website').trim().notEmpty().withMessage('You must supply a website'),
];

// ROUTES
router.get('/currentuser', currentUser, currentUserRoute);
router.put('/updateuser', currentUser, requireAuth, updateValidation, validateRequest, updateUserRoute);
router.post('/signin', signinValidation, validateRequest, signinRoute);
router.post('/signup', signupValidation, validateRequest, signupRoute);
router.post('/signout', signoutRoute);

export { router as authRouter };
