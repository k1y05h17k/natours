const mongoose = require('mongoose');
const { trim } = require('validator');

// Model Schema to create tour on db mongo

const tourSchema = new mongoose.Schema({
    name:{
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    duration:{
      type: Number,
      required:[true, 'A tour must have a duration']
    },
    maxGroupSize:{
      type: Number,
      required:[true,'A tour must have a group size']
    },
    difficulty:{
      type:String,
      required:[true,'A tour must have a difficulty']
    },
    ratingAverange:{
      type: Number,
      default: 4.5
    },
    ratingsQuantity:{
      type: Number,
      default: 0
    },
    price:{
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary:{
      type: String,
      trim: true,
      required:[true, 'A tour must have a description']
    },
    description:{
      type: String,
      trim: true
    },
    imageCover:{
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images:[String],
    createdAt: {
      type: Date,
      default:Date.now()
    },
    startDates: [Date] //When the tour Start
  });
  
  const Tour = mongoose.model('Tour', tourSchema);
  
  module.exports = Tour;


// First Test to create a new tour
  
//   const newTour = new Tour({
//     name: 'The Park Amazon',
//     rating: 4.3,
//     price: 1000
//   });
  
// Command save, your functionaly is to create a new tour in mongoDB
//   newTour.save().then(doc => {
//     console.log(doc);
//   }).catch(err=>{
//     console.log('ERROR 💣:', err);
//   });
  