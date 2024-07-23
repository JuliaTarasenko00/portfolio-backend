import { model, Schema } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';

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
  },
  { versionKey: false }
);

skillSchema.post('save', handleSaveError);
skillSchema.pre('findOneAndUpdate', runValidation);
skillSchema.post('findOneAndUpdate', handleSaveError);

export const Skill = model('skill', skillSchema);
