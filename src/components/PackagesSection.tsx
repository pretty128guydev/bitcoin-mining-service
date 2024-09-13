import React from "react";
import { Card } from "antd";
import SpecialPackage from "./SpecialPackage";
import TextAnimation from "./TextAnimation";

// Define the package data
const packages = [
  {
    packageRating: 1,
    ratingIncome: "$50",
    validTime: "60 days",
    dailyEarnings: "1.5 USD/day",
    unlockPrice: "50 USDT",
  },
  {
    packageRating: 2,
    ratingIncome: "$130",
    validTime: "60 days",
    dailyEarnings: "3.9 USD/day",
    unlockPrice: "130 USDT",
  },
  {
    packageRating: 3,
    ratingIncome: "$280",
    validTime: "60 days",
    dailyEarnings: "8.4 USD/day",
    unlockPrice: "280 USDT",
  },
  {
    packageRating: 4,
    ratingIncome: "$340",
    validTime: "60 days",
    dailyEarnings: "10.2 USD/day",
    unlockPrice: "340 USDT",
  },
  {
    packageRating: 5,
    ratingIncome: "$500",
    validTime: "60 days",
    dailyEarnings: "15 USD/day",
    unlockPrice: "500 USDT",
  },
  {
    packageRating: 6,
    ratingIncome: "$1000",
    validTime: "60 days",
    dailyEarnings: "30 USD/day",
    unlockPrice: "1000 USDT",
  },
  {
    packageRating: 7,
    ratingIncome: "$2000",
    validTime: "60 days",
    dailyEarnings: "60 USD/day",
    unlockPrice: "2000 USDT",
  },
  {
    packageRating: 8,
    ratingIncome: "$3000",
    validTime: "60 days",
    dailyEarnings: "90 USD/day",
    unlockPrice: "3000 USDT",
  },
  {
    packageRating: 9,
    ratingIncome: "$5000",
    validTime: "60 days",
    dailyEarnings: "150 USD/day",
    unlockPrice: "5000 USDT",
  },
  {
    packageRating: 10,
    ratingIncome: "$10000",
    validTime: "60 days",
    dailyEarnings: "300 USD/day",
    unlockPrice: "10000 USDT",
  },
];

const PackagesSection: React.FC = () => {
  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <TextAnimation text="Special &nbsp; Packages" />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "space-evenly",
        }}
      >
        {packages.map((pkg, index) => (
          <SpecialPackage
            key={index}
            packageRating={pkg.packageRating}
            dailyEarnings={pkg.dailyEarnings}
            validTime={pkg.validTime}
            ratingIncome={pkg.ratingIncome}
            unlockPrice={pkg.unlockPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesSection;
