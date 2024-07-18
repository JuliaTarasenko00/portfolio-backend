import Joi from 'joi';
import { model, Schema } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';

const experienceSchema = new Schema(
  {
    uk: {
      start_work: {
        type: String,
        required: true,
      },
      end_work: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      name_organization: {
        type: String,
        required: true,
      },
    },
    en: {
      start_work: {
        type: String,
        required: true,
      },
      end_work: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      name_organization: {
        type: String,
        required: true,
      },
    },
  },
  { versionKey: false }
);

export const experienceJoiSchema = Joi.object({
  uk: Joi.object({
    start_work: Joi.string().required(),
    end_work: Joi.string().required(),
    position: Joi.string().required(),
    name_organization: Joi.string().required(),
  }),
  en: Joi.object({
    start_work: Joi.string().required(),
    end_work: Joi.string().required(),
    position: Joi.string().required(),
    name_organization: Joi.string().required(),
  }),
});

experienceSchema.post('save', handleSaveError);
experienceSchema.pre('findOneAndUpdate', runValidation);
experienceSchema.post('findOneAndUpdate', handleSaveError);

export const Experience = model('experience', experienceSchema);
