import { Router } from 'express';
import educationController from '../controllers/education-controller.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../decorators/validateBody.js';
import { educationJoiSchema } from '../models/Education.js';
import authenticate from '../middlewares/authenticate.js';

const educationRouter = Router();
const educationValidate = validateBody(educationJoiSchema);

educationRouter.get('/', educationController.getEducation);
educationRouter.get(
  '/all_information',
  authenticate,
  educationController.getAllEducationInformation
);
educationRouter.get(
  '/:id',
  authenticate,
  isValidId,
  educationController.getEducationById
);
educationRouter.post(
  '/add_education_information',
  authenticate,
  educationValidate,
  educationController.addEducationInformation
);
educationRouter.patch(
  '/edit_information/:id',
  isValidId,
  authenticate,
  educationValidate,
  educationController.editEducationInformation
);
educationRouter.delete(
  '/remove/:id',
  isValidId,
  authenticate,
  educationController.deleteEducationInformation
);

export default educationRouter;
