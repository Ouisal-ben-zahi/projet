import React from 'react';

const LoadingSpinner = () => (
  <div className="loading">
    <div className="spinner-border text-success" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-2">Chargement...</p>
  </div>
);

export default LoadingSpinner; 