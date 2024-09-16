import React from "react";
import { Card } from "antd";
import SpecialPackage from "./SpecialPackage";
import TextAnimation from "./TextAnimation";
import { useTranslation } from "react-i18next";

const PackagesSection: React.FC = () => {
  const { t } = useTranslation();
  // Define the package data
  const packages = [
    {
      packageRating: 1,
      ratingIncome: "$50",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `1.5 ${t("USD/day")}`,
      unlockPrice: "50 USDT",
    },
    {
      packageRating: 2,
      ratingIncome: "$130",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `3.9 ${t("USD/day")}`,
      unlockPrice: "130 USDT",
    },
    {
      packageRating: 3,
      ratingIncome: "$280",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `8.4 ${t("USD/day")}`,
      unlockPrice: "280 USDT",
    },
    {
      packageRating: 4,
      ratingIncome: "$340",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `10.2 ${t("USD/day")}`,
      unlockPrice: "340 USDT",
    },
    {
      packageRating: 5,
      ratingIncome: "$500",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `15 ${t("USD/day")}`,
      unlockPrice: "500 USDT",
    },
    {
      packageRating: 6,
      ratingIncome: "$1000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `30 ${t("USD/day")}`,
      unlockPrice: "1000 USDT",
    },
    {
      packageRating: 7,
      ratingIncome: "$2000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `60 ${t("USD/day")}`,
      unlockPrice: "2000 USDT",
    },
    {
      packageRating: 8,
      ratingIncome: "$3000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `90 ${t("USD/day")}`,
      unlockPrice: "3000 USDT",
    },
    {
      packageRating: 9,
      ratingIncome: "$5000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `150 ${t("USD/day")}`,
      unlockPrice: "5000 USDT",
    },
    {
      packageRating: 10,
      ratingIncome: "$10000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `300 ${t("USD/day")}`,
      unlockPrice: "10000 USDT",
    },
  ];
  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <TextAnimation text={`${t("Special")}  ${t("Packages")}`} />
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
