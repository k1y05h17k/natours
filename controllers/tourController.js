const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeature');

// List top five Tours
exports.aliasTopTours = async = (req, res, next) => {
    try {
        req.query.limit = '5';
        req.query.sort = '-ratingsAverage, price';
        req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
        next();
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// GET ALL TOURS IN THE DATABASE
exports.getAllTours = async (req, res) => {
    try {
        // Execute the Query
        const feature = new APIFeatures(Tour.find(), req.query).filter().sort().limit().paginate()
        const tours = await feature.query;

        // Send Response success
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })

    }
};

// GET THE TOUR FOR YOUR ID
exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err

        })
    }
};

//Create a new tour wuth a post!
exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'sucess',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });

    }
}

// UPDATE THE TOUR FOR THE ID
exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                data: tour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });

    }

};

// DELETE THE TOUR FOR THE ID
exports.deleteTour = async (req, res) => {

    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: ''
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Verify how many items exits in database
exports.getTourStats = async (req, res) => {
    try {
      const stats = await Tour.aggregate([
        {
            $match: { ratingAverage: { $gte: 4.5 } }
        },
        {
          $group: {
            _id: { $toUpper: '$difficulty' },
            numTours: { $sum: 1 },
            numRatings: { $sum: '$ratingsQuantity' },
            avgRating: { $avg: '$ratingAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' }
          }
        },
        {
            $sort: { avgPrice: 1 }
          },
          {
            $match:{_id: {$ne: 'EASY'}}
          }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          stats
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

  exports.getMonthlyPlan = async (req, res) => {

    try{
        const year = req.params.year * 1;

        const plan = await Tour.aggregate([
            {
             $unwind:'$startDates'
            },
            {
             $match:{
                startDates:{
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
             }   
            },
            {
              $group:{
                _id: {$month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
              },  
            },
            {
                $addFields: { month: '$_id' }
            },
           
            {
                $project: { _id: 0 }
            },
            {
                $sort:{ numTourStarts: -1 }
            },
            {
                $limit: 12
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
              plan
            }
          });

    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
          });
    }
  }
