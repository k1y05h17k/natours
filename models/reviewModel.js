const mongoose = require('mongoose');

// review / rating createAt / ref to tour / ref to user
const reviewSchema = new mongoose.Schema({
    review:{
        type: String,
        required: [true, 'Review can not be empty']
    },
    rating:{
        type: Number,
        min:1,
        max:5
        
    },
    createdAt: {
        type: Date,
        default:Date.now()
    },
    user:
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: [true, 'Review must belong to a User']
        },
    
    tour:
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Tour',
          required: [true, 'Review must belong to a Tour']
        }

},
{
    toJSON: {virtuals: true},
    toJObject: {virtuals: true}
  
});

reviewSchema.pre(/^find/, function(next){
    // this.populate({
    //      path: 'tour',
    //      select: 'name'        
    // }).populate({
    //     path: 'user',
    //     select: 'name photo'
    // })

    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
});





const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
