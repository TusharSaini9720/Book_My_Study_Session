import React from 'react'
import Leftpart from './leftpart'
import Footer from '../frontpage/Footer';
import axios from "axios";
import BookingCard from "./bookingcard";
const Userbooking = (props) => {
  const [currentBookings, setcurrentBookings] = React.useState([]);
  const [pastBookings, setpastBookings] = React.useState([]);
  const url = "https://backend-of-book-study-session.onrender.com/api/v1/users/myBookings/";
  React.useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        setcurrentBookings(res.data.CurrentBookings);
        setpastBookings(res.data.PastBookings);
      })
      .catch((err) => {
        //show error page
        console.log(err);
      });
  }, []);
  return (
    <>
    <div className='main1' >
  <div className='main2' >
    <Leftpart signedIn={props.signedIn} sethistory={props.sethistory} token={props.token}/>
  <div >
  <h1 className="Booking-Heading">My current Bookings</h1>
      <section className="cont1">
        {currentBookings.length === 0 ? (
          <h2>No Booking available yet! </h2>
        ) : (
          currentBookings.map((booking) => {
            return <BookingCard booking={booking} />;
          })
        )}
      </section>

      <h1 className="Booking-Heading">My Previous Bookings</h1>
      <section className="cont1">
        {pastBookings.length === 0 ? (
          <h2>No Booking available yet! </h2>
        ) : (
          pastBookings.map((booking) => {
            return <BookingCard booking={booking} />;
          })
        )}
      </section>
  </div>
  </div>
  </div>
  <Footer/>
    </>
  )
}

export default Userbooking
