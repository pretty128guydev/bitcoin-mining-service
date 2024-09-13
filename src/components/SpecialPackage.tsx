// SpecialPackage.tsx
import React from "react";
import "./SpecialPackage.css"; // Importing the CSS file
import StarRating from "./StarRating";

interface SpecialPackageProps {
  packageRating: number;
  dailyEarnings: string;
  validTime: string;
  ratingIncome: string;
  unlockPrice: string;
}

const SpecialPackage: React.FC<SpecialPackageProps> = ({
  packageRating,
  dailyEarnings,
  validTime,
  ratingIncome,
  unlockPrice,
}) => {
  return (
    <div className="package_container">
      <div className="packageDetails">
        <StarRating rating={packageRating} />
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
