import { Router } from 'express';
import skillController from '../controllers/skill-controller.js';
import authenticate from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../decorators/validateBody.js';
import { skillsJoiSchema } from '../models/Skill.js';

const skillRouter = Router();
const skillsValidation = validateBody(skillsJoiSchema);

skillRouter.get('/', skillController.getSkills);
skillRouter.post(
  '/add_new_skill',
  skillsValidation,
  authenticate,
  skillController.addSkill
);

skillRouter.patch(
  '/edit_skill/:id',
  skillsValidation,
  authenticate,
  isValidId,
  skillController.editSkill
);

skillRouter.delete(
  '/remove/:id',
  authenticate,
  isValidId,
  skillController.removeSkill
);
export default skillRouter;
