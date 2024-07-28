import { model, Schema } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';

const valueType = {
  values: ['style', 'front'],
  message: 'subscription invalid',
};

const skillSchema = new Schema(
  {
    name_skill: {
      type: String,
      required: true,
    },
    image: {
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

skillSchema.post('save', handleSaveError);
skillSchema.pre('findOneAndUpdate', runValidation);
skillSchema.post('findOneAndUpdate', handleSaveError);

export const Skill = model('skill', skillSchema);
