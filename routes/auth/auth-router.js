import { Router } from 'express';
import authController from '../../controllers/auth/auth-controller.js';
import validateBody from '../../decorators/validateBody.js';
import { userSignInSchema } from '../../models/User.js';
import authenticate from '../../middlewares/authenticate.js';

const authRouter = Router();
const userValidate = validateBody(userSignInSchema);

authRouter.post('/signup', userValidate, authController.sighUp);
authRouter.post('/signin', userValidate, authController.signIn);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/signout', authenticate, authController.logOut);

export default authRouter;
