import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { finallyResult } from '../helpers/finallyResult.js';
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
  const { body } = req;

  let pathUk = '';
  let pathEn = '';

  if (req.files) {
    pathUk = req.files['uk[avatar]'][0].path;
    pathEn = req.files['en[avatar]'][0].path;
  }
  const data = {
    uk: {
      avatar: pathUk,
      ...body.uk,
    },
    en: {
      avatar: pathEn,
      ...body.uk,
    },
  };

  const result = await Contact.create(data);

  res.status(201).json(result);
};

export default {
  getContactInformation: ctrlWrapper(getContactInformation),
  addContactInformation: ctrlWrapper(addContactInformation),
  getAllInformation: ctrlWrapper(getAllInformation),
};
