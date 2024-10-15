import React from 'react';
import './pastsearch.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

function Pastsearch({ history }) {
  return (
    <div className="card1">
      <div className="image-container">
        <img className="card-img-top" src={history.image} alt="Card image cap" />
        <div className="overlay">
          <p className="subject-title">{history.subjectName}</p>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => (
              index < history.starRating ? (
                <FaStar key={index} style={{ color: '#FFD43B' }} />
              ) : (
                <FaRegStar key={index} style={{ color: '#FFD43B' }} />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pastsearch;
