const APIFeatures = require('../utils/apiFeature');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields)=>{
  const newObj = {};
  Object.keys(obj).forEach(el =>{
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


exports.getAllUsers = catchAsync(async(req, res) => {
    const feature = new APIFeatures(User.find());
    const users = await feature.query

    res.status(200).json({
      status: 'success',
      results: users.length,
      data:{
        users
      }
    });
  });

  exports.updateMe = catchAsync(async(req, res, next) => {
    // 1) Create error if user POSts password date
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password updates /updateMyPassword', 400));
    }
    
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3) Update user document
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true, 
      runValidators: true}
    );
    
    res.status(200).json({
      status: 'success',
      data:{
        user:updateUser
      }
    });

  });

  exports.deleteMe = catchAsync( async(req,res, next) =>{
    await User.findByIdAndUpdate(req.user.id,{active: false})

    res.status(204).json({
      status: 'success',
      data: null
    })
  })


  exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

  // Do NOT update password with this!
  exports.updateUser = factory.updateOne(User);

  exports.deleteUser = factory.deleteOne(User);
