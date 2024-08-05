import { model, Schema } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';

const projectSchema = new Schema(
  {
    nameProject: {
      type: String,
      required: true,
    },
    description_uk: {
      type: String,
      required: true,
    },
    technologyStack: {
      type: String,
      required: true,
    },
    image1: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    linkGit: {
      type: String,
      required: true,
    },
    livePage: {
      type: String,
      required: true,
    },
    description_en: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

projectSchema.post('save', handleSaveError);
projectSchema.pre('findOneAndUpdate', runValidation);
projectSchema.post('findOneAndUpdate', handleSaveError);

const Project = model('project', projectSchema);

export default Project;
