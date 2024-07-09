import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';

const educationSchema = new Schema(
  {
    uk: {
      start_education: {
        type: String,
        required: true,
      },
      end_education: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      programme_subject: {
        type: String,
        default: null,
      },
      name_organization: {
        type: String,
        required: true,
      },
    },
    en: {
      start_education: {
        type: String,
        required: true,
      },
      end_education: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      programme_subject: {
        type: String,
        default: null,
      },
      name_organization: {
        type: String,
        required: true,
      },
    },
  },
  { versionKey: false }
);

export const educationJoiSchema = Joi.object({
  uk: Joi.array().items(
    Joi.object({
      start_education: Joi.string().required(),
      end_education: Joi.string().required(),
      degree: Joi.string().required(),
      programme_subject: Joi.string().required(),
      name_organization: Joi.string().required(),
      id: Joi.string().required(),
    })
  ),
  en: Joi.array().items(
    Joi.object({
      start_education: Joi.string().required(),
      end_education: Joi.string().required(),
      degree: Joi.string().required(),
      programme_subject: Joi.string().required(),
      name_organization: Joi.string().required(),
      id: Joi.string().required(),
    })
  ),
});

educationSchema.post('save', handleSaveError);
educationSchema.pre('findOneAndUpdate', runValidation);
educationSchema.post('findOneAndUpdate', handleSaveError);

const Education = model('education', educationSchema);

export default Education;
