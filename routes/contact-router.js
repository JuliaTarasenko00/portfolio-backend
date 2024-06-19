import { Router } from 'express';
import contactController from '../controllers/contact-controller.js';

const contactRouter = Router();

contactRouter.get('/', contactController.getContactInformation);

export default contactRouter;
