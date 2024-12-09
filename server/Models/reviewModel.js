const mongoose=require('mongoose');
 const Course=require('./courseModel');
 const User=require('./userModel');

const reviewschema=new mongoose.Schema({
    review:{
        type:String,
        trim: true,
        required: [true, "A review must have a review:"],
        maxlength: [1000, "Length of review must be less than 500"],
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "A review must belongs to a course:"],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A review must belongs to a user:"],
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

  reviewschema.index({course:1,user:1},{unique:true});

  // reviewschema.pre(/^find/,function(next){
  //   this.populate({
  //       path:"user",
  //       select:"name photo"
  //   });
  //   // this.populate({ path: "course", select: "name" });
  //   next();
  // });
  reviewschema.pre(/^find/, function (next) {
    this.populate({
      path: 'course',
      select: 'name image',
    }).populate({
      path: 'user',
      select: 'name photo',
    });
    next();
  });

  reviewschema.statics.calcAverageRating=async function(courseId){
    // console.log(courseId);
    const stats=await this.aggregate([
        {
            $match:{course:courseId}
        },
        {
            $group:{
                _id:'$course',
                nRating:{$sum:1},
                avgRating:{$avg:'$rating'},
                oneStar: { $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] } },
                twoStar: { $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] } },
              threeStar: { $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] } },
               fourStar: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
              fiveStar: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } }
            }
        }
    ]);
  //  console.log(stats);
   if(stats.length>0){
     await Course.findByIdAndUpdate(courseId,{
        rating:stats[0].avgRating,
        ratingsQuantity:stats[0].nRating,
        oneStar:stats[0].oneStar,
        twoStar:stats[0].twoStar,
        threeStar:stats[0].threeStar,
        fourStar:stats[0].fourStar,
        fiveStar:stats[0].fiveStar
    })}
    else{
        await Course.findByIdAndUpdate(courseId,{
            rating:4.0,
            ratingsQuantity:0,
            oneStar:0,
            twoStar:0,
            threeStar:0,
            fourStar:0,
            fiveStar:0
        })
    }
  }
  reviewschema.post('save',function(){
    // console.log("in reviewschema");
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
    console.log('inpost',this.r.course);
         await this.r.constructor.calcAverageRating(this.r.course) 
  })
  

  const Review=mongoose.model("Review",reviewschema);
  module.exports=Review;