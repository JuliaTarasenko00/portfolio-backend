import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { finallyResult } from '../helpers/finallyResult.js';
import HttpError from '../helpers/HttpError.js';
import Contact from '../models/Contact.js';

const getContactInformation = async (req, res) => {
  const { language = 'en' } = req.query;

  const result = await Contact.find();

  const data = finallyResult(result, language);

  res.json(...data);
};

const getAllInformation = async (req, res) => {
  const result = await Contact.find();

  res.json(...result);
};

const addContactInformation = async (req, res) => {
  const { body, files } = req;

  let pathUk = '';
  let pathEn = '';

  if (files) {
    pathUk = files['uk[avatar]'][0].path;
    pathEn = files['en[avatar]'][0].path;
  }
  const data = {
    uk: {
      avatar: pathUk,
      ...body.uk,
    },
    en: {
      avatar: pathEn,
      ...body.en,
    },
  };

  const result = await Contact.create(data);

  res.status(201).json(result);
};

const editContactInformation = async (req, res) => {
  const { body, files } = req;
  const { id } = req.params;

  let pathUk = '';
  let pathEn = '';

  const fileUk = files['uk[avatar]'];
  const fileEn = files['en[avatar]'];

  if (fileUk) {
    pathUk = fileUk[0].path;
  }
  if (fileEn) {
    pathEn = fileEn[0].path;
  }

  const data = {
    uk: {
      avatar: pathUk,
      ...body.uk,
    },
    en: {
      avatar: pathEn,
      ...body.en,
    },
  };

  const result = await Contact.findByIdAndUpdate(id, data, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContactInformation = async (req, res) => {
  const { id } = req.params;

  const result = await Dish.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: 'Data deleted successfully',
  });
};

export default {
  getContactInformation: ctrlWrapper(getContactInformation),
  addContactInformation: ctrlWrapper(addContactInformation),
  getAllInformation: ctrlWrapper(getAllInformation),
  editContactInformation: ctrlWrapper(editContactInformation),
  deleteContactInformation: ctrlWrapper(deleteContactInformation),
};
