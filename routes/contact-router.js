import { Router } from 'express';
import contactController from '../controllers/contact-controller.js';
import { upload } from '../middlewares/cloudinary.js';
import isValidId from '../middlewares/isValidId.js';

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
contactRouter.patch(
  '/edit/:id',

  upload.fields([
    { name: 'uk[avatar]', maxCount: 1 },
    { name: 'en[avatar]', maxCount: 1 },
  ]),
  isValidId,
  contactController.editContactInformation
);
contactRouter.delete(
  '/remove/:id',
  isValidId,
  contactController.deleteContactInformation
);

export default contactRouter;
