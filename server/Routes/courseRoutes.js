const express=require('express');
const coursecontroller=require('../controller/courseController');
const tutorauthcontroller=require('../controller/tutorauthcontroller');
const reviewcontroller=require('../controller/reviewController');
const reviewrouter=require('./reviewRoutes');
const courseRouter = express.Router();

courseRouter.get("/images/:fileName", coursecontroller.sendImage);
courseRouter.get("/images/world/:fileName", coursecontroller.sendImage1);
courseRouter.use('/:courseId/reviews',reviewrouter);

courseRouter.get("/",coursecontroller.getallcourse);
courseRouter.post("/",tutorauthcontroller.protect,coursecontroller.createcourse);

courseRouter.route('/:id')
.get(coursecontroller.getcourse)
.patch(
    coursecontroller.uploadCoursePhoto,
    coursecontroller.resizeCoursePhoto,
    coursecontroller.updatecourse)
.delete(coursecontroller.deletecourse);

module.exports=courseRouter;