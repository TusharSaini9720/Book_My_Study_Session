import React from 'react';
import './DetailSection.css';

function DetailSection() {
  return (
    <div className="detail-section">
      <div className="left-section">
        <h2 className="course-name">Course Name</h2>
        <div className="languages-container">
          <p className="visible-languages">Languages: English, Spanish</p>
          <p className="hidden-languages">French, German, Italian, Chinese</p>
        </div>
        <div style={{flex:"column" }}>
        <button className="book-now-button">Book Now</button>
        </div>
        <p className="enrolled-info"><strong>200</strong> already enrolled</p>
      </div>
      <div className="right-section">
        <div className="video-card">
          <video width="100%" height="100%" controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default DetailSection;
