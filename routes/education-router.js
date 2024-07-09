import { Router } from 'express';
import educationController from '../controllers/education-controller.js';
import isValidId from '../middlewares/isValidId.js';

const educationRouter = Router();

educationRouter.get('/', educationController.getEducation);
educationRouter.get(
  '/all_information',
  educationController.getAllEducationInformation
);
educationRouter.get('/:id', isValidId, educationController.getEducationById);
educationRouter.post(
  '/add_education_information',
  educationController.addEducationInformation
);
educationRouter.patch(
  '/edit_information/:id',
  isValidId,
  educationController.editEducationInformation
);
educationRouter.delete(
  '/remove/:id',
  isValidId,
  educationController.deleteEducationInformation
);

export default educationRouter;
