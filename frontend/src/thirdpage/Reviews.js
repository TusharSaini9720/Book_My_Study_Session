import React,{useState,useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import { FaBars,FaRegStar } from 'react-icons/fa';
import { ProgressBar } from "react-bootstrap";
import './Reviews.css';
import Review from './Review';
import {AiFillStar} from 'react-icons/ai';
import axios from 'axios';

function Reviews({Session}) {
  const ratings = [
    { stars: 5, percentage: (Session.fiveStar/Session.ratingsQuantity)*100, color: '#4caf50' }, // Green for high percentage
    { stars: 4, percentage: (Session.fourStar/Session.ratingsQuantity)*100, color: '#8bc34a' },
    { stars: 3, percentage: (Session.threeStar/Session.ratingsQuantity)*100, color: '#ffeb3b' },
    { stars: 2, percentage: (Session.twoStar/Session.ratingsQuantity)*100, color: '#ffc107' },
    { stars: 1, percentage: (Session.oneStar/Session.ratingsQuantity)*100, color: '#f44336' } // Red for low percentage
  ];
const [reviews,setreviews]=useState([]);
  const url=`https://backend-of-book-study-session.onrender.com/api/v1/courses/${Session._id}/reviews`;

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        //  console.log("data",data);
        setreviews(data.data.review);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, [Session]);

  return (
    <div className="reviews-section">
         
      <div className="reviews-left">
      <h1 className="review-heading">Students Reviews</h1>
        <div className="overall-rating">
        <div className="stars">
        {[...Array(5)].map((star, index) =>
              index < Session.rating ? (
                <AiFillStar key={index} className="star-icon1" />
              ) : (
                <FaRegStar key={index} className="star-icon1" />
              )
            )}
          </div>
          <h2>{Session.rating}-Star</h2>
        </div>
      <div className="rating-bars">
          {ratings.map((rating) => (
            <div key={rating.stars} className="rating-bar">
              <span className="star-text">{rating.stars}-Star</span>
              <progress
                className="rating-progress"
                value={rating.percentage}
                max="100"
              ></progress>
              <span className="percentage-text">{rating.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
      <Review reviews={reviews}/>
    </div>
  );
}

export default Reviews;
