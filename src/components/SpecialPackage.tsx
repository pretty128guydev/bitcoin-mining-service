// SpecialPackage.tsx
import React from "react";
import "./SpecialPackage.css"; // Importing the CSS file

interface SpecialPackageProps {
  packageName: string;
  dailyEarnings: string;
  validTime: string;
  ratingIncome: string;
  unlockPrice: string;
}

const SpecialPackage: React.FC<SpecialPackageProps> = ({
  packageName,
  dailyEarnings,
  validTime,
  ratingIncome,
  unlockPrice
}) => {
  return (
    <div className="package_container">
      <div className="package_header">
        <h3 className="package_headerText">Special Package</h3>
      </div>
      <div className="packageDetails">
        <h2>{packageName}</h2>
        <div className="ratingIncome">
          <p>Daily Earnings</p>
          <p className="dayText">{dailyEarnings}</p>
        </div>
        <div className="ratingIncome">
          <p>Valid Time</p>
          <p className="dayText">{validTime}</p>
        </div>
        <div className="ratingIncome">
          <p>Rating income</p>
          <p className="usdtText">{ratingIncome}</p>
        </div>
        <button className="unlockButton">{unlockPrice} Unlock now</button>
      </div>
    </div>
  );
};

export default SpecialPackage;
