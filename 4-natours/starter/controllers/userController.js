const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsyncError = require('./../utils/catchAsyncError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  // Send Response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsyncError(async (req, res, next) => {
  //1. Throw error if user tries to update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError(`Can't update password with this route`, 400));
  }

  //2. Update user document
  const filteredBody = filterObj(req.body, 'name', 'email')
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
});

exports.deleteMe = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })
  
  res.status(204).json({
    status: 'success',
    data: null
  })
})

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

exports.updateUser = factory.updateOne(User)

exports.deleteUser = factory.deleteOne(User);

// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'Error',
//     message: 'Not implemented yet',
//   });
// };
