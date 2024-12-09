const Review=require('./../Models/reviewModel');
const factoryhandler=require('./factoryhandler');

exports.getallreview=async(req,res)=>{
    try{
        let review;
        if(req.params.courseId)
         review=await Review.find({course:req.params.courseId});
        else if(req.user)
        review=await Review.find({user:req.user._id.toString()});
    else if(req.tutor){
        review=await Review.find({user:req.tutor._id.toString()});
    }
    else review = await Review.find();
        res.status(200).json({
            status:'success',
            result:review.length,
            data:{
                review
            }
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err
        })
    }
}
exports.addreview=async(req,res,next)=>{
    try{
        if(!req.body.course)req.body.course=req.params.courseId;
        if(!req.body.user)req.body.user=req.user.id;
        const reviewData = {
            review: req.body.review,
            rating: req.body.rating,
            course: req.params.courseId, 
            user: req.user.id, 
          };
          const existingReview = await Review.findOne({ course: req.body.course, user: req.body.user });
          if (existingReview) {
            return res.status(400).json({
              status: 'failed',
              message: 'You have already reviewed this course.',
            });
          }
        console.log("courseid",req.params.courseId);
        const review=await Review.create(reviewData);
        console.log("courseid");
        res.status(200).json({
            status:'success',
            result:review
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err
        })
    }
};

exports.updatereview=async(req,res)=>{
    try{
        const review=await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            status:'success',
            review
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err
        })
    }
}

exports.deletereview=factoryhandler.deleteOne(Review);