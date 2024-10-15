import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing an icon for green checkmarks
import './LearningSection.css';

function LearningSection() {
  const learnData = [
    ["Understand core principles of programming", "Master object-oriented design"],
    ["Work with APIs and databases", "Develop full-stack applications"],
    ["Learn advanced problem-solving techniques", "Optimize for performance"],
    ["Debug and troubleshoot complex issues", "Work with version control (Git)"],
    ["Collaborate on projects", "Prepare for technical interviews"],
  ];

  return (
    <div className="learning-section">
      <h2>What you'll learn</h2>
      <div className="learn-content">
        {learnData.map((row, index) => (
          <div className="learn-row" key={index}>
            <div className="learn-item">
              <FaCheckCircle className="learn-icon" /> {row[0]}
            </div>
            <div className="learn-item">
              <FaCheckCircle className="learn-icon" /> {row[1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningSection;
