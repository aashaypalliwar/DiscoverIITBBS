const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name of the user should be specified'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    bio: {
      type: String,
    },
    Tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tag',
      },
    ],
    role: {
      type: String,
      enum: ['user', 'Admin', 'superAdmin'],
      default: 'user',
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
