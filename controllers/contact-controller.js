import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { finallyResult } from '../helpers/finallyResult.js';
import Contact from '../models/Contact.js';

const getContactInformation = async (req, res) => {
  const { language = 'en' } = req.query;

  const result = await Contact.find();

  const data = finallyResult(result, language);

  res.json(...data);
};

export default {
  getContactInformation: ctrlWrapper(getContactInformation),
};
