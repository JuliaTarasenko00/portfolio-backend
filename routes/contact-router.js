import { Router } from 'express';
import contactController from '../controllers/contact-controller.js';
import { upload } from '../middlewares/cloudinary.js';

const contactRouter = Router();

contactRouter.get('/', contactController.getContactInformation);
contactRouter.get('/all_information', contactController.getAllInformation);
contactRouter.post(
  '/add_information',
  upload.fields([
    { name: 'uk[avatar]', maxCount: 1 },
    { name: 'en[avatar]', maxCount: 1 },
  ]),
  contactController.addContactInformation
);

export default contactRouter;
