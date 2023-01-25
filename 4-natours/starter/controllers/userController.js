const User = require('./../models/userModel');
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
