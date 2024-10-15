import React from 'react';
import './TopRatedTutors.css';
import { FaStar, FaUser, FaBook, FaRegCalendarCheck } from 'react-icons/fa';

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
      image: 'https://img.freepik.com/premium-photo/portrait-handsome-man-standing-green-background_53419-7572.jpg',
    },
    {
      name: 'Jane Smith',
      subject: 'Physics',
      starRating: 4,
      bookings: 110,
      reviews: 85,
      sessions: 130,
      description: 'Specializes in mechanics and electromagnetism, with 8 years of experience.',
      image: 'https://img.freepik.com/premium-photo/portrait-young-woman-wearing-glasses-standing-green-background_53419-7571.jpg',
    },
    {
      name: 'Michael Johnson',
      subject: 'Chemistry',
      starRating: 5,
      bookings: 140,
      reviews: 105,
      sessions: 160,
      description: 'Organic chemistry expert with a passion for teaching students of all levels.',
      image: 'https://img.freepik.com/premium-photo/portrait-smiling-man-standing-with-arms-crossed-green-background_53419-7570.jpg',
    },
    {
        name: 'John Doe',
        subject: 'Mathematics',
        starRating: 5,
        bookings: 120,
        reviews: 98,
        sessions: 150,
        description: 'Expert in algebra, calculus, and geometry with 10 years of teaching experience.',
        image: 'https://img.freepik.com/premium-photo/portrait-handsome-man-standing-green-background_53419-7572.jpg',
      },
      {
        name: 'John Doe',
        subject: 'Mathematics',
        starRating: 5,
        bookings: 120,
        reviews: 98,
        sessions: 150,
        description: 'Expert in algebra, calculus, and geometry with 10 years of teaching experience.',
        image: 'https://img.freepik.com/premium-photo/portrait-handsome-man-standing-green-background_53419-7572.jpg',
      },
      {
        name: 'John Doe',
        subject: 'Mathematics',
        starRating: 5,
        bookings: 120,
        reviews: 98,
        sessions: 150,
        description: 'Expert in algebra, calculus, and geometry with 10 years of teaching experience.',
        image: 'https://img.freepik.com/premium-photo/portrait-handsome-man-standing-green-background_53419-7572.jpg',
      },
  ];

  return (
    <div className="top-rated-tutors">
      <h2>Top Rated Tutors</h2>
      <div className="tutor-cards">
        {tutors.map((tutor, index) => (
          <div className="tutor-card" key={index}>
            <img className="tutor-image" src={tutor.image} alt={`${tutor.name}`} />
            <div className="tutor-info">
              <h3 className="tutor-name">{tutor.name}</h3>
              <p className="tutor-subject">Expert in {tutor.subject}</p>
              <div className="star-rating">
                <span style={{color:"#FFD43B",paddingRight:"5px"}}>{tutor.starRating}</span>
                  {[...Array(5)].map((star, i) => (
                    i < tutor.starRating ? (
                      <FaStar key={i} style={{ color: '#FFD43B' }} />
                    ) : (
                      <FaStar key={i} style={{ color: '#E0E0E0' }} />
                    )
                  ))}
                </div>
              <div className="tutor-stats">
                <div className="stat-item">
                  <FaUser /> {tutor.bookings} bookings
                </div>
                <div className="stat-item">
                  <FaRegCalendarCheck /> {tutor.sessions} sessions
                </div>
                <div className="stat-item">
                  <FaBook /> {tutor.reviews} reviews
                </div>
              </div>
              <p className="tutor-description">{tutor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRatedTutors;
