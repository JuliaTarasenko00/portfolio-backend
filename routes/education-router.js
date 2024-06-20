import { Router } from 'express';
import educationController from '../controllers/education-controller.js';

const educationRouter = Router();

educationRouter.get('/', educationController.getEducation);

export default educationRouter;
