import React from 'react';
import Morecoursescard from '../cards/Morecoursescard';

function MoreCourses({TutorAllCourses,Tutor,onCourseClick}) {
  return (
    <div style={{padding: '20px'}}>
        <h1>More Courses Of Tutor</h1>
    <div style={{ display: 'flex', gap: '20px' }}>
      {TutorAllCourses.map((course, index) => (
        <Morecoursescard key={index} course={course} Tutor={Tutor} onCourseClick={onCourseClick}/>
      ))}
    </div>
    </div>
  );
}

export default MoreCourses;