import React, { useState } from "react";
import "./DetailSection.css";
import Modal from "./Booking";
import image from '../data/images/11042383.jpg'
import image1 from '../data/images/360_F_644102888_xpJhbJ0c2l533J27jci9ETbiDFXsR1GI.jpg'

function DetailSection({ Session, Tutor ,token,signedIn}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="detail-section">
      <div className="left-section">
        <h2 className="course-name">{Session.name}</h2>
        <div className="tutor-info">
          <img
            src={image1}
            alt="Tutor"
            className="tutor-image"
          />
          <div className="tutor-details">
            <span className="tutor-name">{Tutor.name}</span>
            <p className="tutor-bio">{Tutor.qualifications}</p>
          </div>
        </div>
        <div className="topic">
          {Session.topics.map((topic, index) => (
            <span key={index} className="tag">
              {topic.topicName}
            </span>
          ))}
        </div>
        <div style={{flex:"column" }}>
        <button className="book-now-button" onClick={handleBookNowClick}>
          Book Now
        </button>
        </div>
        <p className="enrolled-info">
          <strong>{Session.bookings}</strong> already enrolled
        </p>
      </div>
      <div className="right-section">
        <div className="image-card" style={{ 
          borderRadius: "15px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
          overflow: "hidden", 
          height: "20rem", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center"
        }}>
          <img 
            src={image} 
            alt="Session Visual" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }} 
          />
        </div>
      </div>
      <Modal 
  isOpen={isModalOpen} 
  onClose={handleCloseModal} 
  session={Session} 
  availableHours={Tutor.availableHours} 
  tutor={Tutor._id}
  token={token} 
  signedIn={signedIn} 
/>
    </div>
  );
}

export default DetailSection;
