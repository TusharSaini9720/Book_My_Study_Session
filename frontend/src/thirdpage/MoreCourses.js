import React from 'react';
import Morecoursescard from '../cards/Morecoursescard';

function MoreCourses() {
  const courses = [
    {
      subjectName: 'Mathematics',
      starRating: 4,
      badge: 'Top Tutor',
      completionPercentage: 75,
      image: 'https://img.freepik.com/premium-photo/green-book-with-green-cover-sits-green-background_842113-3213.jpg?w=740',
    },
    {
      subjectName: 'Physics',
      starRating: 5,
      badge: 'Highly Rated',
      completionPercentage: 90,
      image: 'https://img.freepik.com/free-photo/abstract-image-cosmic-galaxy-nebula-with-shining-stars_73110-35.jpg?w=826&t=st=1724402492~exp=1724403092~hmac=e1ad35713a0b5400fd962934500b563abdbb7165662afc6ed586a69085bc1a8d',
    },
    {
      subjectName: 'Chemistry',
      starRating: 3,
      badge: 'Popular Course',
      completionPercentage: 60,
      image: 'https://img.freepik.com/premium-photo/green-book-with-green-cover-sits-green-background_842113-3213.jpg?w=740',
    },
  ];

  return (
    <div style={{padding: '20px'}}>
        <h1>More Courses Of Tutor</h1>
    <div style={{ display: 'flex', gap: '20px' }}>
      {courses.map((course, index) => (
        <Morecoursescard key={index} course={course} />
      ))}
    </div>
    </div>
  );
}

export default MoreCourses;