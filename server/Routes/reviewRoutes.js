const express = require('express');
const reviewcontroller=require('./../controller/reviewController');
const authController = require('./../controller/authController');
const reviewRoutes=express.Router({mergeParams:true});

 reviewRoutes
 .route('/')
 .get(reviewcontroller.getallreview)
 .post(authController.protect,reviewcontroller.addreview);

 reviewRoutes
 .route('/:id')
 .patch(authController.protect,reviewcontroller.updatereview)
 .delete(reviewcontroller.deletereview)



module.exports=reviewRoutes;
