import React from "react";
import ReviewWindow from './reviewwindow'
const Bookingcard = (props) => {
  const [toggle, settoggle] = React.useState(false);

  return (
    <>
      <ReviewWindow
        hotel={props.booking.hotel}
        toggle={toggle}
        settoggle={settoggle}
      />
      <div className="book-card">
        <section className="date">
          <img src={props.booking.hotel.image[0]} alt="" />
        </section>
        <section className="card-cont">
          <span>{props.booking.hotel.name}</span>
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
          <span>Total Price: ${props.booking.price}</span>
          <button
            onClick={() => {
              settoggle(true);
            }}
          >
            Give Feedback
          </button>
        </section>
      </div>
    </>
  );
};

export default Bookingcard;
