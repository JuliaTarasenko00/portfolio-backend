import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import Project from '../models/Project.js';

const formatObjectByLanguage = (item, language, fields) => {
  const formattedObject = {};

  fields.forEach(field => {
    if (field.includes(language)) {
      formattedObject[field] = item[field];
    } else if (!field.includes('_')) {
      formattedObject[field] = item[field];
    }
  });

  return { ...formattedObject, _id: item._id };
};

const getProjectInformation = async (req, res) => {
  const { language = 'en' } = req.query;

  const result = await Project.find();

  const fields = Object.keys(result[0]._doc);

  const formattedResult = result.map(item =>
    formatObjectByLanguage(item, language, fields)
  );

  res.json(formattedResult);
};

const getAllInformation = async (req, res) => {
  const result = await Project.find();

  res.json(result);
};

const addProjectInformation = async (req, res) => {
  const { body, files } = req;

  let patchImg_1 = '';
  let patchImg_2 = '';

  if (files) {
    patchImg_1 = files['image1'][0].path;
    patchImg_2 = files['image2'][0].path;
  }

  const data = {
    image1: patchImg_1,
    image2: patchImg_2,
    ...body,
  };

  const result = await Project.create(data);

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json(result);
};

const editProjectInformation = async (req, res) => {
  const { id } = req.params;
  const { body, files } = req;

  let patchImg_1 = '';
  let patchImg_2 = '';

  const fileImg_1 = files['image1'];
  const fileImg_2 = files['image2'];

  if (fileImg_1) {
    patchImg_1 = fileImg_1[0].path;
  }
  if (fileImg_2) {
    patchImg_2 = fileImg_2[0].path;
  }

  const data = {
    image1: patchImg_1,
    image2: patchImg_2,
    ...body,
  };
  const result = await Project.findByIdAndUpdate(id, data, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  const result = await Project.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: 'Data deleted successfully',
  });
};

export default {
  getProjectInformation: ctrlWrapper(getProjectInformation),
  getAllInformation: ctrlWrapper(getAllInformation),
  addProjectInformation: ctrlWrapper(addProjectInformation),
  editProjectInformation: ctrlWrapper(editProjectInformation),
  deleteProject: ctrlWrapper(deleteProject),
};
