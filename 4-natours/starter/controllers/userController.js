const User = require('./../models/userModel');
const AppError = require('./../utils/appError')
const catchAsyncError = require('./../utils/catchAsyncError')

exports.getAllUsers = catchAsyncError( async (req, res, next) => {
  const users = await User.find()

    // Send Response
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
});

exports.updateMe = (req, res, next) => {
  //1. Throw error if user tries to update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError(`Can't update password with this route`, 400))
  }

  //2. Update user document
}

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not implemented yet',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not implemented yet',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not implemented yet',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not implemented yet',
  });
};
