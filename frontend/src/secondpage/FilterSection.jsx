import React, { useState } from 'react';
import './FilterSection.css';

function FilterSection({ showFilters }) {
  const [showRating, setShowRating] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [showSubject, setShowSubject] = useState(false);

  return (
    <div className={`filter-section ${showFilters ? 'visible' : ''}`}>
      <h2>Filters</h2>
      <div className="filter">
        <div className="filter-header" onClick={() => setShowRating(!showRating)}>
          Rating
          <span className="dropdown-icon">{showRating ? '▲' : '▼'}</span>
        </div>
        {showRating && (
          <div className="filter-options">
            <label>
              <input type="checkbox" />
              3 & up
            </label>
            <label>
              <input type="checkbox" />
              4 & up
            </label>
            <label>
              <input type="checkbox" />
              5 & up
            </label>
          </div>
        )}
      </div>
      
      <div className="filter">
        <div className="filter-header" onClick={() => setShowClass(!showClass)}>
          Class
          <span className="dropdown-icon">{showClass ? '▲' : '▼'}</span>
        </div>
        {showClass && (
          <div className="filter-options">
            <label>
              <input type="checkbox" />
              8
            </label>
            <label>
              <input type="checkbox" />
              9
            </label>
            <label>
              <input type="checkbox" />
              10
            </label>
            <label>
              <input type="checkbox" />
              11
            </label>
            <label>
              <input type="checkbox" />
              12
            </label>
          </div>
        )}
      </div>
      
      <div className="filter">
        <div className="filter-header" onClick={() => setShowSubject(!showSubject)}>
          Subject
          <span className="dropdown-icon">{showSubject ? '▲' : '▼'}</span>
        </div>
        {showSubject && (
          <div className="filter-options">
            <label>
              <input type="checkbox" />
              Mathematics
            </label>
            <label>
              <input type="checkbox" />
              Physics
            </label>
            <label>
              <input type="checkbox" />
              Chemistry
            </label>
            <label>
              <input type="checkbox" />
              Biology
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSection;
