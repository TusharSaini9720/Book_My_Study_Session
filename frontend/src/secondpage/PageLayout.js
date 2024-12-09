import React, { useState, useEffect } from 'react';
import './PageLayout.css';
import FilterSection from './FilterSection';
import CardSection from './CardSection';
import axios from 'axios';

function PageLayout() {
  const [showFilters, setShowFilters] = useState(true);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
    
  const [Sessions, setSessions] = useState([]);
  const url='/api/v1/courses';

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(url, {
          // params: {
          //   query: searchQuery,
          //   filters: filters,
          //   sortBy: sortBy,
          // },
        });
        const data = response.data;
        // console.log("data",data);
        setSessions(data.data.courses);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, []);
  

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
        <CardSection Sessions={Sessions}/> 

      </div>
       {/* <div className={`content ${showFilters ? 'with-filters' : 'without-filters'}`}>
       <FilterSection showFilters={showFilters} />
        <CardSection />
      </div> */}
    </div>
  );
}

export default PageLayout;
