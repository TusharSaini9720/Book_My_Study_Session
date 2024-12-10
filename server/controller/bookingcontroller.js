const Course = require('../Models/courseModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../Models/userModel');
const Booking = require('../Models/bookingModel');
const getRawBody=require('raw-body');
// Create checkout session for booking
exports.getcheckoutSession = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseid);
    if (!course) {
      return res.status(404).json({ status: "fail", message: "Course not found" });
    }

    const price = course.price * 100 // Calculate price based on noofdays

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get("host")}`, // Redirect after success
      cancel_url: `${req.protocol}://${req.get("host")}/${req.params.courseid}`, // Redirect after cancellation
      customer_email: req.user.email,
      client_reference_id: req.params.courseid,
      metadata: {
        startingDate: req.body.startdate,
        endingDate: req.body.enddate,
        timeSlot: JSON.stringify(req.body.timeSlot), // Save time slots as JSON string
        tutor: course.tutor, // Pass tutor ID // Pass number of days
      },
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: course.name,
            description: course.About_course,
            images: [course.image], // Use first image
          },
          unit_amount: price, // Price in cents
        },
        quantity: 1
      }]
    });

    res.status(200).json({
      status: "success",
      session
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
};

// Helper to create booking on successful payment
const createBookingCheckout = async (session) => {
  const course = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.amount_total / 100; // Convert to original currency format
  const startingDate = session.metadata.startingDate;
  const endingDate = session.metadata.endingDate;
  const timeSlot = JSON.parse(session.metadata.timeSlot); // Parse timeSlot JSON
  const tutor = session.metadata.tutor; // Tutor ID
  // const noofdays = session.metadata.noofdays; // Number of days

  await Booking.create({
    course,
    user,
    price,
    startingDate,
    endingDate,
    timeSlot,
    tutor,
  });
  console.log("Book created successfully");
};

// Webhook for handling Stripe events
exports.webhookCheckout = async (req, res, next) => {
  console.log("webhookCheckout");
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    console.log("req",req.body);
    const rawbody=await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawbody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("err",err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
console.log("event.type ",event.type);
  if (event.type === "checkout.session.completed") {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};
