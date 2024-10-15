
import React from 'react';
import './CardSection.css';
import { FaStar, FaRegStar, FaUserGraduate } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineBook, AiFillStar } from 'react-icons/ai';

function Card({ session }) {
  return (
    <div className="card">
      <img className="card-image" src={session.image} alt={session.topicName} />
      <div className="card-content">
        <div className="card-header">
          <h3 className="topic-name">{session.topicName}</h3>
          <p className="price">{`₹${session.price}`}</p>
        </div>
        <p className="class-info"><FaUserGraduate /> Class: {session.class}</p>
        <p className="description">{session.description}</p>
        <div className="card-footer">
          <div className="rating">
            {[...Array(5)].map((star, index) =>
              index < session.starRating ? (
                <AiFillStar key={index} className="star-icon" />
              ) : (
                <FaRegStar key={index} className="star-icon" />
              )
            )}
            <span style={{color: '#4caf50', fontWeight:'bold'}}>{session.starRating}-Star</span>
          </div>
          <p className="tutor-name">{session.tutorName}</p>
          <div className="icons">
            <span><FiUsers /> {session.bookings} Bookings</span>
            <span><AiOutlineBook /> {session.reviews} Reviews</span>
            <span><FaUserGraduate /> {session.studySessions} Sessions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
