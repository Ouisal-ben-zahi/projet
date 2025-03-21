import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);

export default LoadingSpinner; 