import React from 'react';
import './BookedCourseCard.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import ProgressBar from 'react-bootstrap/ProgressBar';

function BookedCourseCard({ course }) {
  return (
    <div className="booked-course-card">
      <div className="image-container1">
        <img className="card-img-top" src={course.image} alt="Course image" />
      </div>
      <div className="card-body">
        <div className="card-header">
          <p className="subject-title">{course.subjectName}</p>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => (
              index < course.starRating ? (
                <FaStar key={index} style={{ color: '#FFD43B' }} />
              ) : (
                <FaRegStar key={index} style={{ color: '#FFD43B' }} />
              )
            ))}
          </div>
        </div>
        {/* <p className="badge-text">{course.badge}</p> */}
        <div className="progress-container">
          <AiFillCheckCircle style={{ color: '#4CAF50', marginRight: '5px' }} />
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${course.completionPercentage}%` }}
            />
          </div>
          <span className="progress-text">{course.completionPercentage}% Completed</span>
        </div>
      </div>
    </div>
  );
}

export default BookedCourseCard;
