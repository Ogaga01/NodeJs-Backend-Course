const Tour = require('./../models/tourModel')
const catchAsyncError = require('./../utils/catchAsyncError')

exports.getOverview = catchAsyncError(async (req, res, next) => {
    const tours = await Tour.find()
  res.status(200).render('overview', {
      title: 'All Tours',
      tours,
  });
});

exports.getTour = catchAsyncError(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
