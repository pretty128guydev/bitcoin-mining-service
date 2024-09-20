import React from "react";
import "./CuteLoading.css"; // Create a CSS file for styling

const CuteLoading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default CuteLoading;
