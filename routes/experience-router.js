import { Router } from 'express';
import experienceController from '../controllers/experience-controller.js';
import validateBody from '../decorators/validateBody.js';
import { experienceJoiSchema } from '../models/Experience.js';
import authenticate from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';

const experienceRouter = Router();
const experienceValidate = validateBody(experienceJoiSchema);

experienceRouter.get('/', experienceController.getExperience);
experienceRouter.get(
  '/all_information',
  authenticate,
  experienceController.getAllEducationInformation
);
experienceRouter.get(
  '/:id',
  authenticate,
  isValidId,
  experienceController.getExperienceById
);
experienceRouter.post(
  '/add_information',
  authenticate,
  experienceValidate,
  experienceController.addExperienceInformation
);

experienceRouter.patch(
  '/edit_information/:id',
  authenticate,
  isValidId,
  experienceValidate,
  experienceController.experienceEditInformation
);

experienceRouter.delete(
  '/remove/:id',
  authenticate,
  isValidId,
  experienceController.deleteEducationInformation
);

export default experienceRouter;
