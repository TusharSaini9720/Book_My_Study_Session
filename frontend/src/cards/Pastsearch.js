import React from 'react';
import './pastsearch.css';
import { FaStar, FaRegStar,FaStarHalfAlt } from 'react-icons/fa';
import axios from 'axios';
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import image from "../data/images/11042383.jpg"
function Pastsearch(props) {
  const deleteCard = (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.display = "none";
    var optionsforhistory = {
      method: "DELETE",
      url: "http://localhost:3000/api/v1/users/deleteHistory",
      headers: {
        "Authorization":`Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
      data: {
        history: {
          _id: props.history._id,
        },
      },
    };
    axios(optionsforhistory)
      .then((res) => {
        props.sethistory(res.data.data.user.history);
      })
      .catch((err) => console.log(err));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = hasHalfStar ? fullStars + 1 : fullStars;

    return (
      <>
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <FaStar key={index} style={{ color: 'gold' }} />;
          }
          if (index === fullStars && hasHalfStar) {
            return <FaStarHalfAlt key={index} style={{ color: 'gold' }} />;
          }
          return <FaStar key={index} style={{ color: '#ddd' }} />;
        })}
      </>
    );
  };

  return (
  <Link
  style={{ textDecoration: "inherit", color: "inherit" }}
  to={{
    pathname: "/details",
    state: {
    session:props.history.sessionid,
    tutor: props.history.tutorid
    },
  }}
>
  {/*  */}
  <div className="cardforpast">
   <img
      src={image}
      alt="Not available"
      className="imageforcard"
      style={{height: "200px" }}
    />
    <div style={{ paddingTop: "15px", whiteSpace: "90%" }}>
      <p
        style={{
          fontSize: "150%",
          marginBottom: "5px",
          margin:"0px",
          lineHeight: "95%",
          whiteSpace: "initial",
        }}
      >
        {props.history.name}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between"}} >

        <div className='ratingprice'>
 <div className="rating-info">
            <div className="session-rating">
              {/* <span className="rating-value">{props.history.rating}</span> */}
              {renderStars(props.history.rating)}
              <span
style={{
  fontSize: "large",
  fontWeight: "bold",
  display: "inline",
  color: "crimson",
  marginLeft: "5px",
}}
>
{props.history.rating}-star
</span>
              {/* <span className="booking-info">({props.history.totalBookings} bookings)</span> */}
            </div>
          </div>
</div>
      <p style={{ fontSize: "90%", marginBottom: "10px",color: "#444", fontWeight:"bolder"}}>
        Rs{props.history.price}
      </p>
    </div>
    </div>
    <p
      style={{
        position: "absolute",
        top: "5px",
        right: "5px",
        display: "inline",
        color: "white",
        backgroundColor: "inherit",
        fontSize: "x-large",
      }}
      onClick={(e) => deleteCard(e)}
    >
      <TiDelete />
    </p>
  </div>
</Link>
  );
}

export default Pastsearch;
