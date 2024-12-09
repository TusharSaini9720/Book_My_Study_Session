const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the session."],
  },
  class: {
    type: Number,
    required: [true, "Please provide the class for which the session is intended."],
  },
  subject: {
    type: String,
    required: [true, "Please provide the subject."],
  },
  language: {
    type: String,
    required: [true, "Please provide the language of the session."],
  },
  topics: [
    {
      topicName: {
        type: String,
        required: [true, "Please provide the topic name."],
      },
      subTopics: {
        type: [String],
        required: [true, "Please provide the sub-topics for the topic."],
      },
    },
  ],
  duration: {
    type: Number,
    required: [true, "Please provide the session duration."],
  },
  price: {
    type: Number,
    required: [true, "Please provide the session cost."],
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  }, 
   oneStar:{
    type:Number,
    default:0
  },
  twoStar:{
    type:Number,
    default:0
  },
  threeStar:{
    type:Number,
    default:0
  },
  fourStar:{
    type:Number,
    default:0
  },
  fiveStar:{
    type:Number,
    default:0
  },
  bookings: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL for the session."],
  },
  previewVideo: {
    type: String,
    required: [true, "Please provide a preview video URL for the session."],
  },
  features: {
    type: [String],
    enum: [
      "Live 1:1 Tutoring",
      "Notes",
      "Practice Tests",
      "Doubt-Chat Support",
      "Flexible Timings",
      "Session Recordings",
      'Materials List',
      'Writing Prompts',
      'Discussion Forums',
      'Virtual Whiteboard',
      'Group Discussions',
      'Feedback Sessions',
      'Group Projects',
    ],
    required:[true, "Please choose at least one feature."]
  },
  description: {
    type: [
      {
        type: {
          type: String,
          enum: ["paragraph", "heading", "bulletList"],
          required: [true, "Please provide the type of content."],
        },
        content: [
          {
            text: { type: String, required: [true, "Please provide text content."] },
            format: {
              type: String,
              enum: ["plain", "bold", "italic", "link"],
              default: "plain",
            },
            href: { type: String },
          },
        ],
      },
    ],
    required: [true, "Please provide a description for the session."],
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
  },
});
courseSchema.index({price:1,rating:-1});
courseSchema.index({location:'2dsphere'});

 courseSchema.virtual("reviews", {
     ref: "Review",
     foreignField: "course",
     localField: "_id",
   });
//all these middlewares works only with SAVE and CREATE

courseSchema.pre(/^find/, function (next) {
    //for all queries starting with find
    //as it is a query middleware, this refers to current query
    this.find({ active: { $ne: false } });
    next();
  });

const Course=mongoose.model("Course",courseSchema);

module.exports = Course;