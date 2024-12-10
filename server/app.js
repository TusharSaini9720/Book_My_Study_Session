const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const courseRouter=require('./Routes/courseRoutes');
const userRouter = require("./Routes/userRoutes");
const tutorRouter=require('./Routes/tutorRoutes');
const reviewRouter = require("./Routes/reviewRoutes");
const bookingRouter=require("./Routes/bookingRoutes");
const bookingcontroller=require('./controller/bookingcontroller')
//for security
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");


const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP.Please try after one hour",
});
app.use(compression());
const path = require("path");
__dirname = path.resolve();
const bookingRoutes = require("./Routes/bookingRoutes");

//limiting requests from same api
app.use("/api/v1", limiter); //also if app get crashed it will automatically set limit to max

//setting security http headers
//Data sanitization against NOSQL query injection
app.use(mongoSanitize());
//Data sanitization against xss attacks
app.use(xss());
app.use(hpp());
//to get data of requests body and limiting it to maximum 10kb
// app.use(cors());
//app.use(cors({credentials: true,  origin: 'https://hotel-booking-sp0k.onrender.com'}));
// app.use(cors({ origin: "*" }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["self", "https://js.stripe.com", "https://hooks.stripe.com"],
    },
  })
);
const allowedOrigins = [
  'https://book-study-session.vercel.app',
  'https://book-study-session-7fevcuknt-tushars-projects-0a07fff2.vercel.app',
  "https://book-study-session-git-master-tushars-projects-0a07fff2.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Reject the request
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);


app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.hidePoweredBy());

app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  bookingcontroller.webhookCheckout
);
//to read cookie from request
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));
// app.use(bodyParser.json({ limit: "10kb" }));
// // Parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true ,limit: "10kb"}));

//Routes middleware
app.use('/api/v1/courses',courseRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tutors",tutorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/booking",bookingRouter);

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
// );

app.get("*", (req, res) => {
  res.redirect(`${req.protocol}://${req.get("host")}`);
});
module.exports = app;
