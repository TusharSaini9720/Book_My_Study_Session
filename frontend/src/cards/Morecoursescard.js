import React from 'react';
import './BookedCourseCard.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from "react-router-dom";
import image from '../data/images/11042383.jpg'

function Morecoursescard({ course,Tutor,onCourseClick }) {
  return (
    <Link
    style={{ textDecoration: "inherit", color: "inherit" }}
   to="/detail"
   state={{
     Session: course,
     Tutor: Tutor
   }}
   
 >
    <div className="booked-course-card"
      onClick={() => {
        onCourseClick();
        // Add navigation or any other functionality here
      }}>
      <div className="image-container1">
        <img className="card-img-top" src={image} alt="Course image" />
      </div>
      <div className="card-body">
        <div className="card-header">
          <p className="subject-title">{course.subject}</p>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => (
              index < course.rating ? (
                <FaStar key={index} style={{ color: '#FFD43B' }} />
              ) : (
                <FaRegStar key={index} style={{ color: '#FFD43B' }} />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Morecoursescard;