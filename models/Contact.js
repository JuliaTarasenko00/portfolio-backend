import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';

const contactSchema = new Schema(
  {
    uk: {
      name: {
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
      position: {
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
      location: {
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
      cv: {
        type: String,
        // required: true,
      },
    },
    en: {
      name: {
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
      position: {
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
      location: {
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
      cv: {
        type: String,
        // required: true,
      },
    },
  },
  { versionKey: false }
);

export const contactJoiSchema = Joi.object({
  uk: Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    position: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required(),
    location: Joi.string().required(),
    git: Joi.string().required(),
    linkedin: Joi.string().required(),
  }),
  en: Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    position: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required(),
    location: Joi.string().required(),
    git: Joi.string().required(),
    linkedin: Joi.string().required(),
  }),
});

contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', runValidation);
contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact_information', contactSchema);

export default Contact;
