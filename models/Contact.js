import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';

const contactSchema = new Schema(
  {
    name_uk: {
      type: String,
      required: true,
    },
    cv_uk: {
      type: String,
      required: true,
    },
    name_en: {
      type: String,
      required: true,
    },
    cv_en: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    telegram: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    git: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export const contactJoiSchema = Joi.object({
  name_uk: Joi.string().required(),
  cv_uk: Joi.string().required(),
  name_en: Joi.string().required(),
  cv_en: Joi.string().required(),
  position: Joi.string().required(),
  telegram: Joi.string().required(),
  avatar: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
  git: Joi.string().required(),
  linkedin: Joi.string().required(),
});

contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', runValidation);
contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact_information', contactSchema);

export default Contact;
