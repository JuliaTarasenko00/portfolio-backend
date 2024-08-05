import { model, Schema } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';
import Joi from 'joi';

const valueType = {
  values: ['style', 'front'],
  message: 'type invalid',
};

const skillSchema = new Schema(
  {
    name_skill: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: valueType,
    },
  },
  { versionKey: false }
);

export const skillsJoiSchema = Joi.object({
  name_skill: Joi.string().required(),
  type: Joi.string()
    .valid(...valueType.values)
    .messages({
      'any.only': `type invalid`,
    })
    .required(),
});

skillSchema.post('save', handleSaveError);
skillSchema.pre('findOneAndUpdate', runValidation);
skillSchema.post('findOneAndUpdate', handleSaveError);

export const Skill = model('skill', skillSchema);
