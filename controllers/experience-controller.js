import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { finallyResult } from '../helpers/finallyResult.js';
import HttpError from '../helpers/HttpError.js';
import { Experience } from '../models/Experience.js';

const getExperience = async (req, res) => {
  const { language = 'en' } = req.query;

  const result = await Experience.find();
  console.log('result: ', result);

  const data = finallyResult(result, language);

  res.json(data);
};

const getAllEducationInformation = async (req, res) => {
  const result = await Experience.find();

  res.json(result);
};

const getExperienceById = async (req, res) => {
  const { id } = req.params;

  const result = await Experience.findById(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addExperienceInformation = async (req, res) => {
  const { body } = req;

  const result = await Experience.create(body);

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json(result);
};

const experienceEditInformation = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const result = await Experience.findByIdAndUpdate(id, body, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteEducationInformation = async (req, res) => {
  const { id } = req.params;

  await Experience.findByIdAndDelete(id);

  res.json({
    message: 'Data deleted successfully',
  });
};

export default {
  getExperience: ctrlWrapper(getExperience),
  getAllEducationInformation: ctrlWrapper(getAllEducationInformation),
  getExperienceById: ctrlWrapper(getExperienceById),
  addExperienceInformation: ctrlWrapper(addExperienceInformation),
  experienceEditInformation: ctrlWrapper(experienceEditInformation),
  deleteEducationInformation: ctrlWrapper(deleteEducationInformation),
};
