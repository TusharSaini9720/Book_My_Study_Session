// Modal.js
import React, { useState, useEffect } from "react";
import "./Booking.css";
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";

const Modal = ({ isOpen, onClose, availableHours, session ,token,signedIn}) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [remainingDuration, setRemainingDuration] = useState(session.duration);
  const [days, setDays] = useState(0);
  const [state,setstate]=useState('Book Now');
  const onBook=()=>{
console.log("onBooking");
  }
// console.log("remainingDuration",remainingDuration);
useEffect(() => {
    if (selectedSlots.length > 0) {
      // Calculate the total hours per day from selected slots
      const hoursPerDay = selectedSlots.reduce((sum, slot) => {
        const startTime = new Date(`1970-01-01T${convertTo24Hour(slot.startTime)}`);
        const endTime = new Date(`1970-01-01T${convertTo24Hour(slot.endTime)}`);
        const duration = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
        return sum + duration;
      }, 0);
  
      if (hoursPerDay > 0) {
        const requiredDays = Math.ceil(session.duration / hoursPerDay);
        setDays(requiredDays);
      } else {
        setDays(0);
      }
    } else {
      setDays(0);
    }
  }, [selectedSlots]);
  

  if (!isOpen) return null;
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10); // Parse hours to a number
  
    if (hours === 12) hours = 0; // Adjust for 12-hour clock
    if (modifier === "PM") hours += 12; // Convert PM to 24-hour format
  
    return `${String(hours).padStart(2, "0")}:${minutes}:00`; // Convert hours back to string and pad
  };
  

  

  const handleSlotToggle = (slot) => {
    // Parse start and end times to calculate duration
    const startTime = new Date(`1970-01-01T${convertTo24Hour(slot.startTime)}`);
    const endTime = new Date(`1970-01-01T${convertTo24Hour(slot.endTime)}`);
    
    const durationOfSlot = (endTime - startTime) / (1000 * 60 * 60); // Duration in hours
  
    if (isNaN(durationOfSlot)) {
      console.error("Error calculating slot duration. Ensure valid time format.");
      return;
    }
    if (selectedSlots.some((s) => s.startTime === slot.startTime)) {
      // Remove the slot if already selected
      const updatedSlots = selectedSlots.filter(
        (s) => s.startTime !== slot.startTime
      );
      setSelectedSlots(updatedSlots);
      setRemainingDuration(remainingDuration + durationOfSlot);
    } else {
      // Add slot if there's enough remaining duration
      if (remainingDuration >= durationOfSlot) {
        setSelectedSlots([...selectedSlots, slot]);
        setRemainingDuration(remainingDuration - durationOfSlot);
      } else {
        alert("Not enough remaining hours for this slot.");
      }
    }
  };
  const stripePromise = loadStripe(
    "pk_test_51QSdosSJEBIowZWYO5s3sUjImLGpz2iVa5JEH3zGK8cF92kfnKRn23RclXIKovn0DfDpL9Bk2PWzQxRP4KKKJHTp00Jt5jOZQ6"
  );
  

  const url = `https://backend-of-book-study-session.onrender.com/api/v1/booking/checkout-session/${session._id}`;
  const handleBookNow = async() => {
    try {
      if (!signedIn) {
        alert("Login as customer to book a hotel. ");
        return;
      }
      if (selectedSlots.length === 0) {
        alert("Please select at least one slot.");
        console.log("in handle1");
        return
      }
      console.log("url2",url);
      console.log("in handle");
      setstate("Loading...");
         const currentDate = new Date(); // Current date
    const startDate = new Date(currentDate); // Start date is the current date
    const endDate = new Date(currentDate); // Clone current date for endDate calculation
    endDate.setDate(currentDate.getDate() + days);
    console.log("date",startDate);
    console.log("enddate",endDate);
    const bookingDetails = {
    timeSlot: selectedSlots, // Ensure this matches schema structure
    price: session.price, // Add session price
    startingDate: startDate.toISOString(), // Convert to ISO format
    endingDate: endDate.toISOString(),
    };
    console.log("url",url);
      const Session = await axios({
        method: "POST",
        url: url,
        headers: {
            "Authorization":`Bearer ${token}`
            // "Content-Type": "application/json",
          },
         data: bookingDetails,
      });
      console.log("Session",Session);
      const stripe = await stripePromise;
      stripe.redirectToCheckout({ sessionId: Session.data.session.id });
      setstate("Book Now");
      onClose();
    } catch (err) {
      setstate("Book Now");
      console.log(err);
      alert("Could not complete the payment! Please try again later");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Select Available Slots</h2>
        <p>
        Duration of Course: <strong>{session.duration} hours</strong>
        </p>
        <p>
          Price: <strong>Rs{session.price}</strong>
        </p>
        <div className="slots-container">
          {availableHours.map((slot, index) => (
            <div
              key={index}
              className={`slot ${
                selectedSlots.some((s) => s.startTime === slot.startTime)
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleSlotToggle(slot)}
            >
              {slot.startTime} - {slot.endTime}
            </div>
          ))}
        </div>
        <p>
          Number of Days: <strong>{days}</strong>
        </p>
        <button className="book-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Modal;
