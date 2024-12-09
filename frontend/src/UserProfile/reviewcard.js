import React from "react";
import StarRatings from "react-rating";
import "./reviewcard.css"; // Assuming you have a CSS file for sty
import image from "../data/images/11042383.jpg"
import {AiFillStar} from 'react-icons/ai';
import { FaBars,FaRegStar } from 'react-icons/fa';

const ReviewCard = (props) => {
  return (
    <div className="review-card">
      {/* Image Section */}
      <div className="review-image">
        <img
          src={image}
          alt="Course Thumbnail"
          className="review-thumbnail"
        />
      </div>

      {/* Content Section */}
      <div className="review-content">
        {/* Course Name and Date */}
        <div className="review-header">
          <h3 className="review-course-name">
            {props.review.course.name || "Course Name Not Available"}
          </h3>
          <p className="review-date">
            {new Date(props.review.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Rating Section */}
        <div className="overall-rating">
        <div className="stars1">
        {[...Array(5)].map((star, index) =>
              index < props.review.rating ? (
                <AiFillStar key={index} className="star-icon1" />
              ) : (
                <FaRegStar key={index} className="star-icon1" />
              )
            )}
          </div>
          <h2 style={{fontSize:"2rem", marginTop:"10px", marginBottom:"10px"}}>{props.review.rating}-Star</h2>
        </div>

        {/* User Review */}
        <p className="review-text">
          {props.review.review || "No review provided by the user."}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;


