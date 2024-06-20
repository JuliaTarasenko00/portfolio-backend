import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { finallyResult } from '../helpers/finallyResult.js';
import Education from '../models/Education.js';

const getEducation = async (req, res) => {
  const { language = 'en' } = req.query;

  const result = await Education.find();

  const data = finallyResult(result, language);

  res.json(...data);
};

export default {
  getEducation: ctrlWrapper(getEducation),
};
