import React from 'react';
import './ProductDetailPage.css';
import DetailSection from './DetailSection';
import Smallcard from './Smallcard';
import LearningSection from './LearningSection';
import Reviews from './Reviews';
import Description from './Description';
import MoreCourses from './MoreCourses';
function ProductDetailPage() {
  return (
    <div className="product-detail-page">
      {/* Detail Section */}
      {/* <div className="detail-section">
        {/* <h1>Course Title</h1>
        <p>Details about the course...</p> 
       
      </div> */}
       <DetailSection/>

      {/* Small Card Section */}
      {/* <div className="small-card">
        <h3>Course Highlights</h3>
        <p>Quick highlights or offers...</p>
      </div> */}
      <div className="smallcard">
      <Smallcard/>
      </div>

      {/* Learning Section */}
      {/* <div className="learning-section">
        <h2>What you will learn</h2>
        <ul>
          <li>Key learning point 1</li>
          <li>Key learning point 2</li>
          <li>Key learning point 3</li>
        </ul>
      </div> */}
   <LearningSection/>

      {/* Review Section */}
      {/* <div className="reviews-section">
        <h2>Student Reviews</h2>
        <Reviews/>
      </div> */}
      <Reviews/>

      {/* Description Section */}
      {/* <div className="description-section">
        <h2>Course Description</h2>
        <p>Detailed description of the course...</p>
      </div> */}
       <Description/>
       <MoreCourses/>
    </div>
  );
}

export default ProductDetailPage;
