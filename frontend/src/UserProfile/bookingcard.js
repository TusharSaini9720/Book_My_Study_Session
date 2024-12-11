import React from "react";
import ReviewWindow from './reviewwindow'
import image from '../data/images/11042383.jpg'
const Bookingcard = (props) => {
  const [toggle, settoggle] = React.useState(false);

  return (
    <>
      {/* <ReviewWindow
        hotel={props.booking.course}
        toggle={toggle}
        settoggle={settoggle}
      /> */}
      <div className="book-card">
        <section className="date">
          <img src={image} alt="" />
        </section>
        <section className="card-cont">
          <span>{props.booking.course.name}</span>
          <span>
            Booking Date:{" "}
            {new Date(props.booking.createdAt).toLocaleDateString()}
          </span>
          <span>
            First Date:{" "}
            {new Date(props.booking.startingDate).toLocaleDateString()}
          </span>
          <span>
            Last Date:{" "}
            {new Date(props.booking.endingDate).toLocaleDateString()}
          </span>
          <span>{props.tutor.name}</span>
          <div className="slots-container">
          {props.timeSlot.map((slot, index) => (
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
          <span>Total Price: ${props.booking.price}</span>
          {/* <button
            onClick={() => {
              settoggle(true);
            }}
          >
            Give Feedback
          </button> */}
        </section>
      </div>
    </>
  );
};

export default Bookingcard;
