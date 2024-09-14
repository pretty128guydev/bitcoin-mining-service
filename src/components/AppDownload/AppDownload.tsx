import React from 'react';
import './AppDownload.css';

const AppDownload: React.FC = () => {
  return (
    <div className="app-download-container">
      <h1>Download Our App</h1>
      <p>For the best experience, download our mobile app from the links below:</p>
      
      <div className="download-links">
        <a href="#" className="download-btn">Download for iOS</a>
        <a href="#" className="download-btn">Download for Android</a>
      </div>
    </div>
  );
};

export default AppDownload;
