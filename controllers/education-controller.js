import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { finallyResult } from '../helpers/finallyResult.js';
import Education from '../models/Education.js';

const getEducation = async (req, res) => {
  const { language = 'en' } = req.query;

  const result = await Education.find();

  const data = finallyResult(result, language);

  res.json(data);
};

const getAllEducationInformation = async (req, res) => {
  const result = await Education.find();

  res.json(result);
};

const getEducationById = async (req, res) => {
  const { id } = req.params;

  const result = await Education.findById(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addEducationInformation = async (req, res) => {
  const { body } = req;

  const result = await Education.create(body);

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json(result);
};

const editEducationInformation = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const result = await Education.findByIdAndUpdate(id, body, { new: true });
  console.log('result: ', result);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteEducationInformation = async (req, res) => {
  const { id } = req.params;

  await Education.findByIdAndDelete(id);

  res.json({
    message: 'Data deleted successfully',
  });
};
export default {
  getEducation: ctrlWrapper(getEducation),
  getAllEducationInformation: ctrlWrapper(getAllEducationInformation),
  getEducationById: ctrlWrapper(getEducationById),
  addEducationInformation: ctrlWrapper(addEducationInformation),
  editEducationInformation: ctrlWrapper(editEducationInformation),
  deleteEducationInformation: ctrlWrapper(deleteEducationInformation),
};
