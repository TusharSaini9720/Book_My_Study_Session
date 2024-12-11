const User = require("./../Models/userModel");
const Review=require('../Models/reviewModel');
const Booking=require('../Models/bookingModel');
const factoryhandler=require('./factoryhandler');
const multer=require('multer');
const sharp=require('sharp');
const path=require('path');
// const multerStroage=multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'dev_data/user');
//   },
//   filename: (req, file, cb) => {
//     const ext=file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// })
const multerStroage=multer.memoryStorage();
const multerFilter=(req,file,cb)=>{
  if(file.mimetype.split('/')[0]!=='image'){
    cb(new Error('Only images are allowed'),false);
  }
  cb(null,true);
}
const upload=multer({
  storage:multerStroage,
  fileFilter:multerFilter
})
exports.uploadUserPhoto = upload.single("photo");
exports.resizeUserPhoto = async(req,res,next)=>{
  if(!req.file)return next();

  req.file.filename=`user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
  .resize(500,500)
  .toFormat('jpeg')
  .jpeg({quality:90})
  .toFile(`dev_data/user/${req.file.filename}`);
  next();
}
exports.sendImage =async (req, res, next) => {
  res.sendFile(
    path.resolve(`${__dirname}/../dev_data/user/${req.params.fileName}`)
  );
};
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      users,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err + "",
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      newUser,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err + "",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      User:  user,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err + "",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    // });
    // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    res.status(400).json({
      status: "failed",
      message: "This route is not for password updates. Please use /updatePassword.",
    });
    return;
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
  );
  if (req.file)
    filteredBody.photo = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/images/${req.file.filename}`;

  const updatedUser = await Customer.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true, //returns new object
      runValidators: true,
    }
  );
    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err + "",
    });
  }
};


exports.deleteUser=factoryhandler.deleteOne(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getMyBookings = async (req, res, next) => {
  try{
    console.log("in try of book");
    const currentDate = new Date();
  const currentBookings = await Booking.find({
    user: req.user.id,
    endingDate: { $gt: currentDate },
  }).populate({ path: "course", select: "name image _id" }).populate({ path: "tutor", select: "name" });
  
  const pastBookings = await Booking.find({
    user: req.user.id,
    endingDate: { $lt: currentDate },
  }).populate({ path: "course", select: "name image _id" }).populate({ path: "tutor", select: "name" });

  res.status(200).json({
    status: "success",
    data: {
      CurrentBookings: currentBookings,
      PastBookings: pastBookings,
    },
  });}
  catch(err){
    console.log("err",err);
    res.status(400).json({
      status: "fail",
     message:" "+err,
  })
}};
exports.getMyReviews = async (req, res, next) => {
  try{const reviews = await Review.find({
    user: req.user.id,
  }).populate({ path: "course", select: "name photo _id" });
  res.status(200).json({
    status: "success",
    data: {
      reviews: reviews,
    },
  });}
  catch(err){
    console.log("err",err);
    res.status(400).json({
      status: "fail",
     message:" "+err,
  })}
};