const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// GET ALL TOURS IN THE DATABASE
exports.getAllTours = factory.getAll(Tour);

// GET THE TOUR FOR YOUR ID
exports.getTour = factory.getOne(Tour, { path: 'reviews' })

//Create a new tour with a post!
exports.createTour = factory.createOne(Tour);

// UPDATE THE TOUR FOR THE ID
exports.updateTour = factory.updateOne(Tour);

// DELETE THE TOUR FOR THE ID
exports.deleteTour = factory.deleteOne(Tour);

// Verify how many items exits in database
exports.getTourStats = catchAsync(async (req, res, next) => {

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
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
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
            $sort: { numTourStarts: -1 }
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
});

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

// tours-within/233/center/34.111745,-118.113491/unit/mi
exports.getToursWithin = catchAsync( async(req, res, next) => {
    const {distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance/3963.2 : distance / 6378.1;

    if(!lat || !lng){
        next(new AppError('Please provide latitude and longitude in the format lat, lng', 400));
    }
    
    const tours = await Tour.find({
        startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
      });
    

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            data: tours
        }
    });
});

exports.getDistances = catchAsync(async (req, res, next) => {
    const {latlng, unit} = req.params;
    const [lat, lng] = latlng.split(',');

    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    if(!lat || !lng){
        next(new AppError('Please provide latitude and longitude in the format lat, lng', 400));
    }

    const distances =  await Tour.aggregate([
        {
            $geoNear:{
                near: {
                    type: 'Point',
                    coordinates: [lng *1, lat *1]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            data: distances
        }
    });
});