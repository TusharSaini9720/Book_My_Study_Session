const mongoose=require('mongoose');
 const Course=require('./courseModel');
// const User=require('./userModel');
const reviewschema=new mongoose.Schema({
    review:{
        type:String,
        trim: true,
        required: [true, "A review must have a review:"],
        maxlength: [500, "Length of review must be less than 500"],
    },
    rating:{
        type:Number,
        required: [true, "A review must have a rating:"],
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"]
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    course:{
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        required: [true, "A review must belongs to a course:"],
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "A review must belongs to a user:"],
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

  reviewschema.index({course:1,user:1},{unique:true});

  reviewschema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"name photo"
    });
    this.populate({ path: "course", select: "name" });
    next();
  });

  reviewschema.statics.calcAverageRating=async function(courseId){
    //console.log(hotelId);
    const stats=await this.aggregate([
        {
            $match:{course:courseId}
        },
        {
            $group:{
                _id:'$course',
                nRating:{$sum:1},
                avgRating:{$avg:'$rating'},
            }
        }
    ]);
   // console.log(stats);
   if(stats.length>0){
     await Course.findByIdAndUpdate(courseId,{
        rating:stats[0].avgRating,
        ratingsQuantity:stats[0].nRating,
    })}
    else{
        await Course.findByIdAndUpdate(courseId,{
            rating:0.0,
            ratingsQuantity:0,
        })
    }
  }
  reviewschema.post('save',function(){
    this.constructor.calcAverageRating(this.course);
  });

//   reviewschema.pre(/^findOneAnd/,async function(next){
//     const r=await this.findOne();
//     console.log("this.r ",r);
//    // next();
//   })
  reviewschema.pre(/^findOneAnd/, async function(next) {
    // Accessing the query being executed
   try{ 
     this.r=await this.findOne().clone();
    next();
  }
    catch(err){
        console.log(err);
    }
});
  reviewschema.post(/^findOneAnd/,async function(){ 
   // console.log('inpost',this.r.course);
         await this.r.constructor.calcAverageRating(this.r.course) 
  })
  

  const Review=mongoose.model("Review",reviewschema);
  module.exports=Review;