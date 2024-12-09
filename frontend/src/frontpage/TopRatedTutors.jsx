import React from 'react';
import './TopRatedTutors.css';
import { FaStar, FaUser, FaBook, FaRegCalendarCheck } from 'react-icons/fa';
import image from '../data/images/11042383.jpg'

function TopRatedTutors() {
  const tutors = [
    {
      name: 'John Doe',
      subject: 'Mathematics',
      starRating: 5,
      bookings: 120,
      reviews: 98,
      sessions: 150,
      description: 'Expert in algebra, calculus, and geometry with 10 years of teaching experience.',
      image:`${image}`,
    },
    {
      name: 'Jane Smith',
      subject: 'Physics',
      starRating: 4,
      bookings: 110,
      reviews: 85,
      sessions: 130,
      description: 'Specializes in mechanics and electromagnetism, with 8 years of experience.',
      image:`${image}`,
    },
    {
      name: 'Michael Johnson',
      subject: 'Chemistry',
      starRating: 5,
      bookings: 140,
      reviews: 105,
      sessions: 160,
      description: 'Organic chemistry expert with a passion for teaching students of all levels.',
      image:`${image}`,
    },
    {
        name: 'John Doe',
        subject: 'Mathematics',
        starRating: 5,
        bookings: 120,
        reviews: 98,
        sessions: 150,
        description: 'Expert in algebra, calculus, and geometry with 10 years of teaching experience.',
        image:`${image}`,
      },
      {
        name: 'John Doe',
        subject: 'Mathematics',
        starRating: 5,
        bookings: 120,
        reviews: 98,
        sessions: 150,
        description: 'Expert in algebra, calculus, and geometry with 10 years of teaching experience.',
        image:`${image}`,
      },
      {
        name: 'John Doe',
        subject: 'Mathematics',
        starRating: 5,
        bookings: 120,
        reviews: 98,
        sessions: 150,
        description: 'Expert in algebra, calculus, and geometry with 10 years of teaching experience.',
        image:`${image}`,
      },
  ];

  return (
    <div className="top-rated-tutors1">
      <h2>Top Rated Tutors</h2>
      <div className="tutor-cards1">
        {tutors.map((tutor, index) => (
          <div className="tutor-card1" key={index}>
            <img className="tutor-image1" src={tutor.image} alt={`${tutor.name}`} />
            <div className="tutor-info11">
              <h3 className="tutor-name1">{tutor.name}</h3>
              <p className="tutor-subject1">Expert in {tutor.subject}</p>
              <div className="star-rating1">
                <span style={{color:"#FFD43B",paddingRight:"5px"}}>{tutor.starRating}</span>
                  {[...Array(5)].map((star, i) => (
                    i < tutor.starRating ? (
                      <FaStar key={i} style={{ color: '#FFD43B' }} />
                    ) : (
                      <FaStar key={i} style={{ color: '#E0E0E0' }} />
                    )
                  ))}
                </div>
              <div className="tutor-stats1">
                <div className="stat-item1">
                  <FaUser /> {tutor.bookings} bookings
                </div>
                <div className="stat-item1">
                  <FaRegCalendarCheck /> {tutor.sessions} sessions
                </div>
                <div className="stat-item1">
                  <FaBook /> {tutor.reviews} reviews
                </div>
              </div>
              <p className="tutor-description1">{tutor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRatedTutors;
