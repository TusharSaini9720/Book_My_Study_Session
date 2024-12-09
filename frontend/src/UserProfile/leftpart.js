import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
const Leftpart = (props) => {
    const deleteAccount = () => {
        if (window.confirm("Are you sure to delete your account?")) {
          const url = "/api/v1/users/deleteMe/";
          const header = {
            "Content-Type": "application/json",
          };
          axios({ method: "DELETE", url: url, headers: header })
            .then((res) => {
              if (res.status === 204) {
                props.sethistory([]);
                props.setsignedIn(false);
                props.setuser({});
              }
            })
            .catch((err) => console.log(err));
        }
      };
  return (
    <>
    <div className="control">
    <Link to="/user/profile" className="part" style={{ textDecoration: 'none', color: 'black' }}>
   Profile
    </Link>
    <Link to="/user/reviews" className="part" style={{ textDecoration: 'none', color: 'black' }}>
   Reviews
    </Link>
    <Link to="/user/bookings" className="part" style={{ textDecoration: 'none', color: 'black' }}>
   Booking
    </Link>

    <div className="part" 
    style={{color: 'red' }}
    onClick={() => {
                deleteAccount();
              }}>
                Logout
            </div>
    
    </div>
    </>
  )
}

export default Leftpart
