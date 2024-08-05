import { Router } from 'express';
import projectController from '../controllers/project-controller.js';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/cloudinary.js';
import isValidId from '../middlewares/isValidId.js';

const projectRouter = Router();

projectRouter.get('/', projectController.getProjectInformation);
projectRouter.get(
  '/all_information',
  authenticate,
  projectController.getAllInformation
);
projectRouter.post(
  '/add_new_project',
  authenticate,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]),
  projectController.addProjectInformation
);
projectRouter.patch(
  '/edit/:id',
  authenticate,
  isValidId,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]),
  projectController.editProjectInformation
);

projectRouter.delete(
  '/remove/:id',
  authenticate,
  isValidId,
  projectController.deleteProject
);

export default projectRouter;
