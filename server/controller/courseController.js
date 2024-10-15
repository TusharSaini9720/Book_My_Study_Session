const multer=require('multer');
const sharp=require('sharp');
const Course=require('../Models/courseModel');
const Tutor=require('../Models/tutorModel');
const factoryhandler = require('./factoryhandler');
const path=require('path');
//const APIFeatures=require('./../utils/Apifeature');

const multerStroage=multer.memoryStorage();
const multerFilter=(req,file,cb)=>{
    console.log("req",req.body);
  if(file.mimetype.split('/')[0]!=='image'){
    cb(new Error('Only images are allowed'),false);
  }
  cb(null,true);
}
const upload=multer({
  storage:multerStroage,
  fileFilter:multerFilter
})
const roomsindex=(body)=>{
    let indexValue=null;
    for (const key in body) {
        if (key.startsWith('Rooms[') && key.endsWith('].roomsimage')) {
          // Extract the index value from the key
          const startIndex = key.indexOf('[') + 1;
          const endIndex = key.indexOf(']');
          indexValue = key.slice(startIndex, endIndex);
          break; // Exit the loop once a matching key is found
        }
      }
      return indexValue;
}
//exports.uploadCoursePhoto = upload.array("image",3);
exports.uploadCoursePhoto =  upload.fields([{ name: 'image', maxCount: 3 }, { name: 'Rooms[0].roomsimage', maxCount: 4 }]);


exports.resizeCoursePhoto=async(req,res,next)=>{
   console.log(req.files);
   if(req.files.image){ 
    req.body.image=[];
     await Promise.all(
    req.files.image.map(async(file,i)=>{
    const filename=`Courses-${req.params.id}-${Date.now()}-${i+1}.jpeg`;
    await sharp(file.buffer)
    .resize(1000,700)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`dev_data/Courses/${filename}`);
    req.body.image.push(`${req.protocol}://${req.get(
        "host"
      )}/api/v1/Courses/images/${filename}`);
}))}
if(req.files['Rooms[0].roomsimage']){
    const room = req.body.Rooms?.[0];
    room.roomsimage = [];
                await Promise.all(
                    req.files['Rooms[0].roomsimage'].map(async (file,i) => {
                    const filename = `rooms-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
                    await sharp(file.buffer)
                        .resize(1000, 700)
                        .toFormat('jpeg')
                        .jpeg({ quality: 90 })
                        .toFile(`dev_data/rooms/${filename}`);
                    room.roomsimage.push(`${req.protocol}://${req.get(
                        "host"
                        )}/api/v1/Courses/roomimages/${filename}`);
                }));
        
}
    next();
}

exports.sendImage = async (req, res, next) => {
    res.sendFile(
      path.resolve(`${__dirname}/../dev_data/Courses/${req.params.fileName}`)
    );
  };
  exports.sendImage1 = async (req, res, next) => {
    res.sendFile(
      path.resolve(`${__dirname}/../dev_data/world/${req.params.fileName}`)
    );
  };
// upload.field({name:"image",6},{name:}); it use for adding different images means for different parts

// exports.aliasTopTours = (req, res, next) => {
//    // req.query.limit = '5';
//     req.query.sort = '-ratingsAverage,price';
//     // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//     next();
//   };

class APIFeatures{
    
    constructor(query,queryString,aggregate=false){
       
        this.query=query;
        this.queryString=queryString;
        this.aggregate=aggregate;
    }

    convertToNumbers(obj) {
        for (let key in obj) {
          if (typeof obj[key] === "object") {
            this.convertToNumbers(obj[key]); // Recursively convert nested objects
          } else if (typeof obj[key] === "string" && !isNaN(obj[key])) {
            obj[key] = parseFloat(obj[key]);
          }
        }
      }
    filter(){
        const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      // 1B) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//   this.query.find(JSON.parse(queryStr));
      queryStr = JSON.parse(queryStr);
    if (this.queryString.facility)
      queryStr.facility = { $all: this.queryString.facility.split(",") };
    if (this.queryString.Theme)
      queryStr.Theme = { $in: this.queryString.Theme.split(",") };

    if (this.aggregate) {
      this.convertToNumbers(queryStr);
      this.query = this.query.match(queryStr); // same way with sort and project
    } else {
      this.query = this.query.find(queryStr);
    }
    return this;
    }
    sort(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy); 
          } else {
            this.query = this.query.sort('-createdAt');
          }
          return this;
    }
}
exports.getallcourse=async(req,res)=>{
    try{
         const features = new APIFeatures(Course.find(), req.query)
         .filter()
         .sort();

        const courses= await features.query;
        res.status(200).json({
            status:'success',
            result:courses.length,
            data:{
                courses:courses
            }
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err
        })
    }
}
exports.createcourse = async (req, res) => {
  try {
    const { name, class: courseClass, subject, language, topics, duration, price, image, previewVideo, features, description } = req.body;
    const tutorId = req.tutor._id.toString();

    // Find the tutor by ID
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).send({ error: 'Tutor not found' });
    }

    // Create a new course with all required fields
    const newCourse = new Course({
      name,               // Name of the course
      class: courseClass,  // Class for the course
      subject,            // Subject
      language,           // Language of the session
      topics,             // Topics covered in the course
      duration,           // Duration of the session
      price,              // Price of the session
      image,              // Image URL
      previewVideo,       // Preview video URL
      features,           // Features of the session
      description,        // Description of the course
      tutor: tutorId      // Link to the tutor
    });

    // Save the new course to the database
    const savedCourse = await newCourse.save();

    // Update the tutor's course list with the new course ID
    await Tutor.updateOne(
      { _id: tutorId },
      { $push: { courses: savedCourse._id } }
    );

    // Respond with the created course
    res.status(201).json({
      status: 'success',
      savedCourse
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message // Send a detailed error message
    });
  }
};
exports.getcourse=async(req,res)=>{
    try{const course=await Course.findById(req.params.id).populate('reviews');
    res.status(200).json({
        status:'success',
        data:{
            course:course
        }
    })
}catch(err){
    res.status(400).json({
        status:'failed',
        message:err
    })
}
};

exports.updatecourse=async(req,res)=>{
    try{
//         const filteredBody = filterObj(req.body, "name","email");
//  if(req.file)filteredBody.photo=req.file.filename;
        const course=await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            status:'success',
            course
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err
        })
    }
};
exports.deletecourse=factoryhandler.deleteOne(Course);

// exports.hotelswithin=async(req,res)=>{
//    try{ const {distance,latlng,unit} = req.params;
//     const [lat,lng]=latlng.split(',');
//     //console.log(distance,lat,lng,unit);
//     const radius=unit==='mil'?distance/3963.2:distance/6378.1;
//     //console.log(radius);
//    // if(!lng||!lat)console.log("inlng ");
//     const hotels=await Hotel.find({
//         location:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}
//     })
//      //console.log(hotels);
//     res.status(200).json({
//         status:'success',
//         result:hotels.length,
//         data:{
//             data:hotels
//         }
//     });}
//     catch(err){
//         res.status(400).json ({ 
//         status:'failed',
//         message:err
//     });
//     }
// }

// exports.hotelsposition=async(req,res)=>{
//     try{
//     const {latlng,unit} = req.params;
//     const [lat,lng]=latlng.split(',');
//     //console.log(distance,lat,lng,unit);
//    // const radius=unit==='mil'?distance/3963.2:distance/6378.1;
//    const multipler=unit==='mil'?0.000621371:0.001;
//    // console.log(radius);
//    // if(!lng||!lat)console.log("inlng ");

//     const distances=await Hotel.aggregate([
//          {
//             $geoNear:{
//                 near:{
//                     type:"Point",
//                     coordinates:[lng*1,lat*1]
//                 },
//                 distanceField:"distance",
//                 distanceMultiplier:multipler
//                 // maxDistance:radius,
//                 // spherical:true,
//                 // includeLocs:"distance"
//             }
//         },{
//         $project : {
//             name:1,
//             distance:1
//         }}
//     ]);

//     res.status(200).json ({ 
//         status:'success',
//         data:{
//             data:distances
//         }
//     });
// }
// catch(err){
// res.status(400).json ({ 
//         status:'failed',
//         message:err
//     });
// }
// }