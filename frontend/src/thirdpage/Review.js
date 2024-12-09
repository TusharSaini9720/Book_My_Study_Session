import React, { useState } from 'react';
import { FaStar,FaRegStar} from 'react-icons/fa';
import {AiFillStar} from 'react-icons/ai';
import './Review.css';

function Review({reviews}) {
  const [showMore, setShowMore] = useState(false);

  const ratings = [
    { profilePic: 'https://via.placeholder.com/100', rating: 4, date: 'Sep 22, 2023', reviewText: 'This course was a great learning experience! The instructor explained all topics clearly and provided useful resources for study...' },
    { profilePic: 'https://via.placeholder.com/100', rating: 5, date: 'Aug 15, 2023', reviewText: 'A really comprehensive and well-structured course. I loved how detailed the lessons were and how engaging the instructor made the topics...' },
    { profilePic: 'https://via.placeholder.com/100', rating: 3, date: 'July 8, 2023', reviewText: 'The course was okay, but I felt like it could have covered more advanced topics...' }
  ];

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="reviews-right">
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-left">
            <img src='https://via.placeholder.com/100' alt="Profile" className="profile-pic" />
          </div>
          <div className="review-right">
            <div className="review-rating">
            <div className="stars">
        {[...Array(5)].map((star, index) =>
              index < review.rating ? (
                <AiFillStar key={index} className="star-icon1" />
              ) : (
                <FaRegStar key={index} className="star-icon1" />
              )
            )}
          </div>
              <span className="review-date"> {new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="review-text">{review.review}</p>
          </div>
        </div>
      ))}

      <button className="show-more-btn" onClick={toggleShowMore}>
        Show More
      </button>

      {showMore && (
        <div className="full-window-overlay" onClick={toggleShowMore}>
          <div className="full-window-content" onClick={(e) => e.stopPropagation()}>
            {reviews.map((review, index) => (
              <div key={index} className="review-card full-window-card">
                <div className="review-left">
                  <img src='https://via.placeholder.com/100' alt="Profile" className="profile-pic" />
                </div>
                <div className="review-right">
                  <div className="review-rating">
                  <div className="stars">
        {[...Array(5)].map((star, index) =>
              index < review.rating ? (
                <AiFillStar key={index} className="star-icon1" />
              ) : (
                <FaRegStar key={index} className="star-icon1" />
              )
            )}
          </div>
                    <span className="review-date">{review.createdAt}</span>
                  </div>
                  <p className="review-text">{review.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
