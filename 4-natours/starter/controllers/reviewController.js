const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  let filter = {}

  if (req.params.tourId) filter = {tour: req.params.tourId}

  //Execute Query
  const features = new APIFeatures(Review.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const reviews = await features.query;

  // Send Response
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

// exports.getReview = catchAsyncError(async (req, res, next) => {
//   const review = await Review.findById(req.params.id);

//   if (!review) {
//     return next(new AppError('No review found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       review,
//     },
//   });
// });

exports.createReview = catchAsyncError(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
