import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import { Skill } from '../models/Skill.js';

const getSkills = async (req, res) => {
  const result = await Skill.find();

  res.json(result);
};

const addSkill = async (req, res) => {
  const { body, file } = req;
  let pathImg = '';

  if (file) {
    pathImg = file.path;
  }

  const data = {
    ...body,
    image: pathImg,
  };

  const result = await Skill.create(data);

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json(result);
};

const editSkill = async (req, res) => {
  const { body, file } = req;
  const { id } = req.params;

  let pathImg = '';

  if (file) {
    pathImg = file.path;
  }

  const image = pathImg !== '' && { image: pathImg };

  const data = {
    ...body,
    ...image,
  };

  const result = await Skill.findByIdAndUpdate(id, data, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const removeSkill = async (req, res) => {
  const { id } = req.params;

  const result = await Skill.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: 'Data deleted successfully',
  });
};

export default {
  getSkills: ctrlWrapper(getSkills),
  addSkill: ctrlWrapper(addSkill),
  editSkill: ctrlWrapper(editSkill),
  removeSkill: ctrlWrapper(removeSkill),
};
