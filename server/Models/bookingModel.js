const mongoose=require('mongoose');

const BookingSchema=new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor',
        required: true
    },
    timeSlot: {
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    },
    price:{
    type: Number,
    required: [true, "A booking must have a price:"],
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    startingDate: {
        type: Date,
        required: [true, "Booking must have a starting date! "],
        min: [Date.now() - 10 * 60 * 1000, "Invalid starting date! "],
        max: [
          Date.now() + 7 * 24 * 60 * 60 * 1000,
          "Booking day must start in next 7 days! ",
        ],
      },
      endingDate:{
        type: Date,
        required: [true, "Booking must have a ending date! "],
        min: [Date.now() - 10 * 60 * 1000, "Invalid ending date! "],
      }

});

BookingSchema.pre('/^find/',function(next){
    this.populate('user').populate({
        path:'hotel',
        select:'name'
    })
    next();
})

const Booking=mongoose.model("Booking",BookingSchema);
module.exports=Booking;
