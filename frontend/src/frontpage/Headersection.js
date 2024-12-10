import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBook } from 'react-icons/fa'; // Importing icons from react-icons

const HeaderSection = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        backgroundColor: '#f8f9fa',
        backgroundImage: 'url(https://imgs.search.brave.com/HfeXZZW9dTZ1SNSQOOxuZFAEH6UuRVQSyHg2LK2w_wE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/Ny8xOS8xMC8wMC9z/Y2hvb2wtd29yay04/NTEzMjhfNjQwLmpw/Zw)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="header-section" style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2rem', borderRadius: '15px' }}>
        <div className="header-content">
          <h2 style={{ marginBottom: '1rem' }}>Finds the Best Tutors for Your Needs</h2>
          <div
            className="search-bar"
            style={{
              backgroundColor: 'rgb(105 255 56)',
              padding: '1.5rem',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
              <p style={{ marginBottom: '1.3rem', marginTop: "10px", color:"white"}}>
            Search by subject and class to find the perfect tutor for you.
          </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '0.5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FaBook style={{ marginRight: '0.5rem', color: '#6c757d' }} />
              <input
                type="text"
                placeholder="Enter Subject"
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  padding: '0.5rem',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '0.5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FaSearch style={{ marginRight: '0.5rem', color: '#6c757d' }} />
              <select
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                }}
              >
                <option value="">Select Class</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
                ))}
              </select>
            </div>
            <Link
              style={{ textDecoration: 'inherit', color: 'inherit' }}
              to={{
                pathname: '/search',
              }}
            >
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#0069d9',
                  color: '#fff',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
