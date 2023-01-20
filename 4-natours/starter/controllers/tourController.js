const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkId = (req, res, next, val) => {
//     console.log(`The current id is ${val}`);
//     if (req.params.id * 1 > tours.length) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Tour not found',
//       });
//     }
//     next();
// }

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'Missing name or price',
//       });
//     }
//     next();
// }

exports.getAllTours = async (req, res) => {
  try {
    //Build Query
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])
    console.log(req.query, queryObj);

    const query = Tour.find(queryObj)
    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    //Execute Query
    const tours = await query

    // Send Response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  //   if (req.params.id * 1 > tours.length) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'Tour not found',
  //     });
  //   }

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: '<Updated tour here...>',
  //   },
  // });
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  // console.log(req.body)
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
