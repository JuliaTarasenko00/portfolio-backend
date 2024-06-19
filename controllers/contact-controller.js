import ctrlWrapper from '../decorators/ctrlWrapper.js';
import Contact from '../models/Contact.js';

const getContactInformation = async (req, res) => {
  const result = await Contact.find();

  res.json(...result);
};

export default {
  getContactInformation: ctrlWrapper(getContactInformation),
};
