import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

export const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
      return {
        folder: 'resume',
        public_id: file.originalname.split('.')[0],
        resource_type: 'auto',
        allowedFormats: ['jpg', 'png', 'pdf'],
      };
    },
  }),
});
