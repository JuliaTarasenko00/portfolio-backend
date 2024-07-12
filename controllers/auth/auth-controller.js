import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ctrlWrapper from '../../decorators/ctrlWrapper.js';
import HttpError from '../../helpers/HttpError.js';
import User from '../../models/User.js';

const { JWT_SECRET } = process.env;

const getToken = payload => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7h' });

  return token;
};

const sighUp = async (req, res) => {
  const { email, password } = req.body;
  const userDuplicateEmail = await User.findOne({ email });

  if (userDuplicateEmail) {
    throw HttpError(409, 'Password or Email invalid');
  }

  const hashPassword = await bcrypt.hash(password, 14);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: newUser._id,
  };

  const { _id: id } = newUser;

  const token = getToken(payload);
  await User.findByIdAndUpdate(id, { token });

  res.status(201).json({
    email: newUser.email,
    token,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw HttpError(401, 'Password or Email invalid');
  }

  const passwordCompare = await bcrypt.compare(password, isUser.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Password or Email invalid');
  }

  const payload = { id: isUser._id };
  const { _id: id } = isUser;

  const token = getToken(payload);
  await User.findByIdAndUpdate(id, { token });

  res.json({
    email: isUser.email,
    token,
  });
};

const getCurrent = async (req, res) => {
  const { _id, email, token } = req.user;

  res.json({
    _id,
    email,
    token,
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({
    message: 'Signout success',
  });
};

export default {
  sighUp: ctrlWrapper(sighUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  logOut: ctrlWrapper(logOut),
};
