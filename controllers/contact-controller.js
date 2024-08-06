import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { formatObjectByLanguage } from '../helpers/formatObjectByLanguage.js';
import HttpError from '../helpers/HttpError.js';
import Contact from '../models/Contact.js';

const getContactInformation = async (req, res) => {
  const { language = 'en' } = req.query;

  const result = await Contact.find();

  const formattedResult = result.map(item =>
    formatObjectByLanguage(item, language, result)
  );

  res.json(...formattedResult);
};

const getAllInformation = async (req, res) => {
  const result = await Contact.find();

  res.json(...result);
};

const addContactInformation = async (req, res) => {
  const { body, file } = req;

  let path = '';

  if (file) {
    path = file.path;
  }
  const data = {
    avatar: path,
    ...body,
  };

  const result = await Contact.create(data);

  res.status(201).json(result);
};

const editContactInformation = async (req, res) => {
  const { body, file } = req;
  const { id } = req.params;

  let path = '';

  if (file) {
    path = file.path;
  }

  const avatar = path !== '' && { avatar: path };

  const data = {
    ...avatar,
    ...body,
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
