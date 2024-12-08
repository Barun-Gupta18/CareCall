// Preloader.js
import React from 'react';
// import './Preloader.css';

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Preloader;
