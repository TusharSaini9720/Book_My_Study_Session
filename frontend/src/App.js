import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import History from './frontpage/History';
import Bookedcards from './frontpage/Bookedcards';
import Footer from './frontpage/Footer';
import TopRatedTutors from './frontpage/TopRatedTutors';
import PageLayout from './secondpage/PageLayout';
import Detail from './thirdpage/ProductDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Route for Home Page ("/") */}
          <Route
            path="/"
            element={
              <>
                <HeaderSection />
                <History signedIn={true} />
                <Bookedcards />
                <TopRatedTutors />
                <Footer />
              </>
            }
          />

          {/* Route for Search Page ("/search") */}
          <Route
            path="/search"
            element={
              <>
                <PageLayout />
                <Footer />
              </>
            }
          />
           <Route
            path="/detail"
            element={
              <>
                <Detail />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>TutorBooking</h1>
      </div>
      <div className="navbar-right">
        <a href="#register">Register as Tutor</a>
        <a href="#signin">Sign In</a>
        <button className="signup-button">Sign Up</button>
      </div>
    </nav>
  );
}

function HeaderSection() {
  return (
    <div className="header-section">
      <div className="header-content">
        <h2>Find the Best Tutors for Your Needs</h2>
        <p>Search by subject and class to find the perfect tutor for you.</p>
        <div className="search-bar">
          <input type="text" placeholder="Enter Subject" />
          <select>
            <option value="">Select Class</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
            ))}
          </select>
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}

export default App;
