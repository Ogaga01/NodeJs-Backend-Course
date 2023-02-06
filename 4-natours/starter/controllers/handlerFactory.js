const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};

exports.updateOne = (Model) => {
    return catchAsyncError(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    });
}

exports.createOne = (Model) => {
    return catchAsyncError(async (req, res, next) => {
      const doc = await Model.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    });
}
