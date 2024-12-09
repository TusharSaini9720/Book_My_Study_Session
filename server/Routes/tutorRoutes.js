const express = require("express");
const tutorcontroller = require("./../controller/tutorcontroller");
const tutorauthcontroller=require('./../controller/tutorauthcontroller');
const tutorRoutes=express.Router();


tutorRoutes.post("/signup", tutorauthcontroller.signup);
tutorRoutes.post("/login", tutorauthcontroller.login);

tutorRoutes.get("/logout", tutorauthcontroller.logout);
tutorRoutes.post("/forgotPassword", tutorauthcontroller.forgotPassword);
tutorRoutes.patch("/resetPassword/:token", tutorauthcontroller.resetPassword);
tutorRoutes.patch(
  "/updatePassword",
  tutorauthcontroller.protect,
  tutorauthcontroller.updatePassword
);
tutorRoutes.patch(
  "/updateData",
  tutorauthcontroller.protect,
  tutorauthcontroller.updateData
);

tutorRoutes
  .get("/:id",tutorcontroller.getTutor
  );


module.exports=tutorRoutes;