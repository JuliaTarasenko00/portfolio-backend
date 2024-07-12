import { model, Schema } from 'mongoose';
import { handleSaveError, runValidation } from './hooks.js';
import Joi from 'joi';

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

export const userSignInSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp, 'Incorrect email (email@gmail.com)')
    .required(),
  password: Joi.string().min(8).required(),
});

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', runValidation);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
