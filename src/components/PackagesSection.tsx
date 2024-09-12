import React from "react";
import { Card } from "antd";
import SpecialPackage from "./SpecialPackage";

// Define the package data
const packages = [
  {
    packageName: "One star package",
    ratingIncome: "$50",
    validTime: "1 times",
    dailyEarnings: "1.5 USD/day",
    unlockPrice: "1.5 USDT",
  },
  {
    packageName: "Two star package",
    ratingIncome: "$130",
    validTime: "2 times",
    dailyEarnings: "1.5 USD/day",
    unlockPrice: "1.5 USDT",
  },
  {
    packageName: "Three star package",
    ratingIncome: "$280",
    validTime: "4 times",
    dailyEarnings: "1.5 USD/day",
    unlockPrice: "1.5 USDT",
  },
  {
    packageName: "Four star package",
    ratingIncome: "$340",
    validTime: "6 times",
    dailyEarnings: "1.5 USD/day",
    unlockPrice: "1.5 USDT",
  },
  {
    packageName: "Five star package",
    ratingIncome: "$500",
    validTime: "8 times",
    dailyEarnings: "1.5 USD/day",
    unlockPrice: "1.5 USDT",
  },
];

const PackagesSection: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        margin: "20px",
        justifyContent: "space-evenly",
      }}
    >
      {packages.map((pkg, index) => (
        <SpecialPackage
          key={index}
          packageName={pkg.packageName}
          dailyEarnings={pkg.dailyEarnings}
          validTime={pkg.validTime}
          ratingIncome={pkg.ratingIncome}
          unlockPrice={pkg.unlockPrice}
        />
      ))}
    </div>
  );
};

export default PackagesSection;
