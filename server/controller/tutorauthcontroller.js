const jwt = require("jsonwebtoken");
const Tutor = require("./../Models/tutorModel");
const { promisify } = require("util");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");

const createSendToken = async(tutor, statusCode, res) => {
  //console.log("in createSendToken");
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
 // console.log("in signup");
  try {
    const newtutor = await Tutor.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      qualifications:req.body.qualifications,
      availableHours:req.body.availableHours
    });
 // console.log(newtutor);
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
  //check if tutor exists & password is correct
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
exports.logout = (req, res) => {
  //just send a corrupted cookie

  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  //no need to send cookie via https as it is already corrupted
  res.cookie("jwt", "logout", cookieOptions);

  res.status(200).json({
    status: "success",
  });
};

exports.forgotPassword = async (req, res) => {
  //1. find tutor with that email
  if (!req.body.email) {
    res.status(200).json({
      status: "failed",
      message: "Please fill the complete form",
    });
    return;
  }
  const tutor = await Tutor.findOne({ email: req.body.email });
  if (!Tutor) {
    res.status(200).json({
      status: "failed",
      message: "There is no tutor registered with this email",
    });
    return;
  }
  //2. get a reset token and save it
  const resetToken = tutor.createPasswordResetToken();
  await tutor.save({ validateBeforeSave: false }); //deactivate all validators in schema as email should be unique
  //3.sending token to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;
  //const resetURL=`http://localhost:3001/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a patch request with your new password with confirmPassword to: 
    ${resetURL}\n If you did't forgot your password, please ignore this email`;

  try {
    await sendEmail({
      email: tutor.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token send to email",
    });
  } catch (err) {
    tutor.passwordResetToken = undefined;
    tutor.passwordResetExpires = undefined;
    await tutor.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "failed",
      message: "Email could not be send",
    });
  }
};

exports.resetPassword = async (req, res) => {
  if (!req.body.password || !req.body.confirmPassword) {
    res.status(200).json({
      status: "failed",
      message: "Please fill the complete form",
    });
    return;
  }
  const hasedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //2. check if token is expired and user still exists and then change the password
  const tutor = await Tutor.findOne({
    passwordResetToken: hasedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    res.status(200).json({
      status: "failed",
      message: "Token is invalid or expired",
    });
    return;
  }
  try {
    tutor.password = req.body.password;
    tutor.confirmPassword = req.body.confirmPassword;
    tutor.passwordResetToken = undefined;
    tutor.passwordResetExpires = undefined;
    await tutor.save();
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: "Confirm Password did not match",
    });
    return;
  }

  //3. update changePassword property for the user through userschema.pre(save)

  //4. Log the user in and send jwt
  createSendToken(user, 200, res);
};

exports.updatePassword = async (req, res) => {
  //1. get user
  if (
    !req.body.password ||
    !req.body.newPassword ||
    !req.body.confirmNewPassword
  ) {
    res.status(200).json({
      status: "failed",
      message: "Please fill the complete form",
    });
    return;
  }
  const tutor = await Tutor.findById(req.tutor.id).select("+password");

  //2. check if password is correct
  if (!(await tutor.correctPassword(req.body.password, tutor.password))) {
    res.status(200).json({
      status: "failed",
      message: "Incorrect password",
    });
    return;
  }

  //3. update the password
  try {
    tutor.password = req.body.newPassword;
    tutor.confirmPassword = req.body.confirmNewPassword;
    await tutor.save();
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: "Confirm Password did not match",
    });
    return;
  }

  //4. login the user
  createSendToken(tutor, 200, res);
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateData = async (req, res) => {
  //1. create error if user send password data
  if (req.body.password || req.body.confirmPassword) {
    res.status(200).json({
      status: "failed",
      message:
        "You can not update password through this route.Please use /updatePassword",
    });
  }

  //2.filter out fields that are not allowed to update
  const filteredBody = filterObj(req.body, "name","email");
 if(req.file)filteredBody.photo=`${req.protocol}://${req.get(
  "host"
)}/api/v1/tutors/images/${req.file.filename}`;
  //3. update the data
  //we can't just save updates because we need only some validations
  const updatedTutor = await User.findByIdAndUpdate(req.tutor.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      tutor: updatedTutor,
    },
  });
};


exports.protect = async (req, res, next) => {
  //1.Getting token and check if it's there
  let token;
  let freshTutor;
  let decodedToken;
 // console.log(req.cookies.jwt);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  else{
    token = req.cookies.jwt;
  }
 // console.log("after token",token);

  if (!token) {
    res.status(400).json({
      status: "falied",
      message: "Login to get access",
    });
    return;
  }

  //2.Verification of token
  decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //actually jwt.verify is already a asycn , so to continue as same we promisify otherwise provide callback

  if (!decodedToken) {
    res.status(400).json({
      status: "falied",
      message: "Please login again!",
    });
    return;
  }

  //3.Check if user still exixts
  freshTutor = await Tutor.findById(decodedToken.id);
  if (!freshTutor) {
    res.status(400).json({
      status: "falied",
      message: "Tutor with this id no longer exists",
    });
    return;
  }

  //4. check if password was changed after creation of token
  if (freshTutor.changedPasswordAfter(decodedToken.iat)) {
    res.status(400).json({
      status: "failed",
      message: "Tutor changed password recently.Please login again!",
    });
    return;
  }
  //5. grant permission to access
  req.tutor = freshTutor;

  next();
};