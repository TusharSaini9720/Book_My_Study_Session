import React from 'react';
import './Smallcard.css';
import { FaStar,FaUserGraduate,FaLanguage} from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdSignalCellularAlt } from 'react-icons/md';

function Smallcard({Session}) {
  return (
    <div className="small-card">
      <div className="card-content">
        <div className="rating">
          <FaStar style={{ color: '#FFD43B' }} />
          <span>{Session.rating}</span>
        </div>
        <div className="duration">
          <AiOutlineClockCircle />
          <span>{Session.duration} hours</span>
        </div>
        <div className="class">
        <FaUserGraduate />
          <span>{Session.class}th {Session.subject}</span>
        </div>
        <div className="class">
        <FaLanguage style={{ color: "rgb(240, 56, 56)" }} />
          <span>{Session.language}</span>
        </div>

      </div>
    </div>
  );
}

export default Smallcard;
