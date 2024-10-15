import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { ProgressBar } from "react-bootstrap";
import './Reviews.css';
import Review from './Review';

function Reviews() {
  const ratings = [
    { stars: 5, percentage: 60, color: '#4caf50' }, // Green for high percentage
    { stars: 4, percentage: 25, color: '#8bc34a' },
    { stars: 3, percentage: 10, color: '#ffeb3b' },
    { stars: 2, percentage: 3, color: '#ffc107' },
    { stars: 1, percentage: 2, color: '#f44336' } // Red for low percentage
  ];
  const reviews = [
    {
      profilePic: 'https://via.placeholder.com/100',
      rating: 4,
      date: 'Sep 22, 2023',
      reviewText:
        'This course was a great learning experience! The instructor explained all topics clearly and provided useful resources for study. I have improved my skills a lot since taking this course and would definitely recommend it to others who are looking for something in-depth and easy to follow.'
    },
    {
      profilePic: 'https://via.placeholder.com/100',
      rating: 5,
      date: 'Aug 15, 2023',
      reviewText:
        'A really comprehensive and well-structured course. I loved how detailed the lessons were and how engaging the instructor made the topics. Every concept was explained in a way that was easy to understand, and the real-world examples helped solidify the learning.'
    },
    {
      profilePic: 'https://via.placeholder.com/100',
      rating: 3,
      date: 'July 8, 2023',
      reviewText:
        'The course was okay, but I felt like it could have covered more advanced topics. However, the basics were well covered and the examples provided were useful. It is a good course for beginners, but if you are looking for something more advanced, you may want to explore other options.'
    }
  ];

  return (
    <div className="reviews-section">
         
      <div className="reviews-left">
      <h1 className="review-heading">Students Reviews</h1>
        <div className="overall-rating">
        <div className="stars">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} style={{ color: '#FFD700', fontSize:'2.5rem'}} />
            ))} 
          </div>
          <h2>4.5</h2>
        </div>
      <div className="rating-bars">
          {ratings.map((rating) => (
            <div key={rating.stars} className="rating-bar">
              <span className="star-text">{rating.stars} stars</span>
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

      {/* <div className="reviews-right">
       
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-left">
              <img
                src={review.profilePic}
                alt="Profile"
                className="profile-pic"
              />
            </div>
            <div className="review-right">
              <div className="review-rating">
                <div className="stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} style={{ color: '#FFD700' }} />
                  ))}
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-text">{review.reviewText}</p>
            </div>
          </div>
        ))}
      </div> */}
      <Review />
    </div>
  );
}

export default Reviews;
