import React from 'react';
import BookedCourseCard from '../cards/BookedCourseCard';
import image from '../data/images/11042383.jpg'

function BookedCourses() {
  const courses = [
    {
      subjectName: 'Mathematics',
      starRating: 4,
      badge: 'Top Tutor',
      completionPercentage: 75,
      image:`${image}`,
    },
    {
      subjectName: 'Physics',
      starRating: 5,
      badge: 'Highly Rated',
      completionPercentage: 90,
      image:`${image}`,
    },
    {
      subjectName: 'Chemistry',
      starRating: 3,
      badge: 'Popular Course',
      completionPercentage: 60,
      image:`${image}`,
    },
  ];

  return (
    <div style={{backgroundColor:" #e5f5e0"}}>
        <h1>BookedCourses</h1>
    <div style={{ display: 'flex', gap: '20px' }}>
      {courses.map((course, index) => (
        <BookedCourseCard key={index} course={course} />
      ))}
    </div>
    </div>
  );
}

export default BookedCourses;
