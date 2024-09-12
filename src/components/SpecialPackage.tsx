// SpecialPackage.tsx
import React from "react";
import "./SpecialPackage.css"; // Importing the CSS file

const SpecialPackage: React.FC = () => {
  return (
    <div className="package_container">
      <div className="package_header">
        <h3 className="package_headerText">Special Package</h3>
      </div>
      <div className="packageDetails">
        <h2>One star package</h2>
        <div className="detailsRow">
          <div>
            <p className="detailTitle">2 Times</p>
            <p>Daily Earnings</p>
          </div>
          <div>
            <p className="detailTitle">90 Days</p>
            <p>Valid Time</p>
          </div>
        </div>
        <div className="ratingIncome">
          <p>Rating income</p>
          <p className="usdtText">0.50 USDT</p>
        </div>
        <button className="unlockButton">15.00 USDT Unlock now</button>
      </div>
    </div>
  );
};

export default SpecialPackage;
