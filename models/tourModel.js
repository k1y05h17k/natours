const mongoose = require('mongoose');
const { trim } = require('validator');
const slugify = require('slugify');

// Model Schema to create tour on db mongo

const tourSchema = new mongoose.Schema({
    name:{
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    slug: String,
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
    ratingAverage:{
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
  },{
    toJSON: {virtuals: true},
    toJObject: {virtuals: true}
  });
  
  tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
  });

  // DOCUMENT MIDDLEWARE: runs before .save() amd .create() .insertMany

  tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true});
    next();
  });

  tourSchema.post('save', function(doc, next){
      console.log(doc);
      next();
  })

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
  