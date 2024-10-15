import React, { useState } from 'react';
import './Description.css';

function Description() {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const description = `Welcome to Math Fundamentals 101, where you will master all the basic math arithmetic you need for Algebra, GED math and other standardized tests, business math, and your daily life!



You will get access to 130+ videos, 250+ practice problems, 9 hours of content, quizzes in each chapter, and a FREE textbook.



This class is taught by Tanya Zakowich, who went from repeating a year of pre-algebra in 9th grade to graduating with a Mechanical Engineering degree from Columbia University to working at NASA, Boeing, and Virgin Hyperloop-One. In 2021 she started Pink Pencil Math and built a community of 1,400,000+ on TikTok and Instagram.



We will take you step-by-step through important math concepts as we work our way together through 12 chapters:



Your Mathematical Mind

Our World of Numbers

Add & Subtract

Multiply

Divide

Primes, Factors & Multiples

Fractions

Mixed Numbers

Decimals

Percentages

Exponents

Roots, Radicals & Fractional Exponents

Order of Operations



By the end of this course you will be confidently solving arithmetic problems and know how to apply them to real-world problems. If you are taking higher-level math, you will find new concepts much easier to learn now that you’ve built yourself a solid math foundation!



Sign up today and get:

Engaging Video Lectures

Pro-tips and Tricks

300+ Page Digital Textbook

Fun Quizzes
`;

  return (
    <div className="description-section">
      <h2 className="section-heading">Course Description</h2>
      <p className="course-description">
        {isReadMore ? description : `${description.substring(0, 700)}...`}
      </p>
      <button onClick={toggleReadMore} className="read-more-btn">
        {isReadMore ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
}

export default Description;
