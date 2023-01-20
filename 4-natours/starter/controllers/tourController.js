const Tour = require('./../models/tourModel')

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

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((tour) => tour.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   results: tour.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.updateTour = (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Tour not found',
//     });
//   }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.createTour = async (req, res) => {
  // console.log(req.body)
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status:'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
};
