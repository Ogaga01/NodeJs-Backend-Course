const mongoose = require('mongoose')
const validator = require('validator')

userSchema = new mongoose.Schema({
  //  name, email, photo, password, password confirm

  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
    maxLength: [40, 'A user name mst have less than 40 characters'],
    minLength: [5, 'A user name mst have more than 5 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email email'],
      unique: true,
    lowercase: true,
      trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    trim: true,
    minLength: [8, 'A user password must have more than 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    trim: true,
    minLength: [8, 'A user password must have more than 8 characters'],
  },
});

const User = mongoose.model('User', userSchema)

module.exports = User;