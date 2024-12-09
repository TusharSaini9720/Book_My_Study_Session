const Tutor = require("./../Models/tutorModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");

const createSendToken = async(tutor, statusCode, res) => {
 // console.log("in createSendToken");
  const token = signToken(tutor._id);
 
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //will only allow this to send cookie if it is https
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  //browser can not access and change this cookie. only recieve and send
  res.cookie("jwt", token, cookieOptions);
  //hide password even when creating new tutor though cookie is not saved
  tutor.password = undefined;
  //console.log(res.headers);
 
   // console.log("in email try block")
    res.status(statusCode).json({
      status: "success",
      token, 
      data: { tutor: tutor },
    });
  
};

const signToken = id => {
  //console.log("process.env.JWT_SECRET ",process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = async (req, res) => {
  try {
    const newtutor = await Tutor.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      qualifications:req.body,qualifications
    });
  
    createSendToken(newtutor, 201, res);
  } catch (err) {
   
    res.status(200).json({
      status: "failed",
      message: err + "",
    });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(200).json({
        status: "failed",
        message: "Please fill the complete form",
      });
      return;
    }
    //check if user exists & password is correct
    const tutor = await Tutor.findOne({ email }).select("+password");
  
    if (!tutor || !(await tutor.correctPassword(password, tutor.password))) {
      res.status(200).json({
        status: "failed",
        message: "Incorrect email or password",
      });
      return;
    }
    //if everything is ok send token to client
    createSendToken(tutor, 200, res);
  };
 // const course=await Course.findById(req.params.id).populate('reviews');
  exports.getTutor = async (req, res) => {
   // console.log('getTutor');
    try {
      const tutor = await Tutor.findById({ _id: req.params.id });
      res.status(200).json({
        status: "success",
        Tutor:  tutor,
      });
    } catch (err) {
      res.status(200).json({
        status: "failed",
        message: err + "",
      });
    }
  };