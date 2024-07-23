import { Router } from 'express';
import skillController from '../controllers/skill-controller.js';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/cloudinary.js';
import isValidId from '../middlewares/isValidId.js';

const skillRouter = Router();

skillRouter.get('/', skillController.getSkills);
skillRouter.post(
  '/add_new_skill',
  authenticate,
  upload.single('image'),
  skillController.addSkill
);

skillRouter.patch(
  '/edit_skill/:id',
  authenticate,
  isValidId,
  upload.single('image'),
  skillController.editSkill
);

skillRouter.delete(
  '/remove/:id',
  authenticate,
  isValidId,
  skillController.removeSkill
);
export default skillRouter;
