import React, { useState, useEffect } from 'react';
import './PageLayout.css';
import FilterSection from './FilterSection';
import CardSection from './CardSection';
import axios from 'axios';

function PageLayout(props) {
  const [showFilters, setShowFilters] = useState(true);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
    
  const [Sessions, setSessions] = useState([]);
  const url='https://backend-of-book-study-session.onrender.com/api/v1/courses';
  const loginUrl = 'https://backend-of-book-study-session.onrender.com/api/v1/users/login'; // Update this URL as per your backend API

  const testUser = {
    email: 'test@gmail.io', // Replace with test user's email
    password: 'test1234',       // Replace with test user's password
  };
  const header = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const autoSignIn = async () => {
      try {
        const res = await axios.post({ url: loginUrl, data: testUser, headers: header });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("history", JSON.stringify(res.data.data.user.history));

        
        props.sethistory(res.data.data.user.history);
        props.settoken(res.data.token);
        props.setsignedIn(true);
        props.setuser(res.data.data.user);
        console.log('Auto sign-in successful:');
      } catch (error) {
        console.error('Error during auto sign-in:', error);
      }
    };

    if (!props.signedIn) {
      autoSignIn();
    }
  }, [loginUrl, props]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
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
