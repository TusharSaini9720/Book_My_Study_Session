import React from 'react';
import './Smallcard.css';
import { FaStar } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdSignalCellularAlt } from 'react-icons/md';

function Smallcard() {
  return (
    <div className="small-card">
      <div className="card-content">
        <div className="rating">
          <FaStar style={{ color: '#FFD43B' }} />
          <span>4.5</span>
        </div>
        <div className="duration">
          <AiOutlineClockCircle />
          <span>3h 30m</span>
        </div>
        <div className="difficulty">
          <MdSignalCellularAlt />
          <span>Medium</span>
        </div>
      </div>
    </div>
  );
}

export default Smallcard;
