import React from 'react'
import Leftpart from './leftpart'
import Footer from '../frontpage/Footer';
import axios from "axios";

import * as Loader from "react-spinners";
import { css } from "@emotion/react";

import ReviewCard from "./reviewcard";

axios.defaults.withCredentials = true;
const Userreview = (props) => {
  const [reviews, setreviews] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const override = css`
    position: fixed;
    left: 30%;
    top: 45%;
  `;

  const url = "/api/v1/users/review/";

  React.useEffect(() => {
    axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${props.token}`, // Replace with valid token
      }
    })
      .then((res) => {
        setloading(false);
        console.log("{res.data.data.review",res.data.data.review);
        setreviews(res.data.data.review);
      })
      .catch((err) => {
        setloading(false);
        //show error page
        console.log(err);
      });
  }, []); 
  return (
    <>
    <div className='main1' >
  <div className='main2' >
    <Leftpart signedIn={props.signedIn} sethistory={props.sethistory} token={props.token}/>
   <div className='userreview'>
   <Loader.BarLoader
        color="gray"
        loading={loading}
        css={override}
        size={80}
      />
      <h1 className="Booking-Heading">My Reviews</h1>
      <section className="cont">
        {reviews.map((review) => {
          return <ReviewCard review={review} />;
        })}
      </section>
   </div>
  </div>
  </div>
  <Footer/>
    </>
  )
}

export default Userreview
