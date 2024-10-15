import React, { useState } from 'react';
import './PageLayout.css';
import FilterSection from './FilterSection';
import CardSection from './CardSection';

function PageLayout() {
  const [showFilters, setShowFilters] = useState(true);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button className="toolbar-button" onClick={toggleFilters}>
          Filters
        </button>
        <button className="toolbar-button">
          Sort By
        </button>
      </div>
      <div className="content">
      <FilterSection showFilters={showFilters} />
        <CardSection /> 

      </div>
       {/* <div className={`content ${showFilters ? 'with-filters' : 'without-filters'}`}>
       <FilterSection showFilters={showFilters} />
        <CardSection />
      </div> */}
    </div>
  );
}

export default PageLayout;
