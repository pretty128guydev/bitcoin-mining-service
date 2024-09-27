import React, { useEffect, useState } from "react";
import { Card } from "antd";
import SpecialPackage from "./SpecialPackage";
import TextAnimation from "./TextAnimation";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import useWindowSize from "../hooks/useWindowSize";
import MobilePackages from "./MobilePackages/MobilePackages";

interface PackagesSectionProps {
  mybalance: number;
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const PackagesSection: React.FC<PackagesSectionProps> = ({ mybalance }) => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const [user_id, setuser_id] = useState<string>("");
  const [verificated, setverificated] = useState<string>("");
  const width = useWindowSize() ?? 0;

  useEffect(() => {
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      setuser_id(userId);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_PORT}/api/get-passport/${userId}`
        )
        .then((response) => {
          setverificated(response.data.passport_verificated);
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });
    } else {
      console.log("no token found");
    }
  }, []);
  // Define the package data
  const packages = [
    {
      packageRating: 1,
      ratingIncome: "$50",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `1.5`,
      unlockPrice: "50",
    },
    {
      packageRating: 2,
      ratingIncome: "$130",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `3.9`,
      unlockPrice: "130",
    },
    {
      packageRating: 3,
      ratingIncome: "$280",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `8.4`,
      unlockPrice: "280",
    },
    {
      packageRating: 4,
      ratingIncome: "$340",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `10.2`,
      unlockPrice: "340",
    },
    {
      packageRating: 5,
      ratingIncome: "$500",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `15`,
      unlockPrice: "500",
    },
    {
      packageRating: 6,
      ratingIncome: "$1000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `30`,
      unlockPrice: "1000",
    },
    {
      packageRating: 7,
      ratingIncome: "$2000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `60`,
      unlockPrice: "2000",
    },
    {
      packageRating: 8,
      ratingIncome: "$3000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `90`,
      unlockPrice: "3000",
    },
    {
      packageRating: 9,
      ratingIncome: "$5000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `150`,
      unlockPrice: "5000",
    },
    {
      packageRating: 10,
      ratingIncome: "$10000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `300`,
      unlockPrice: "10000",
    },
  ];
  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        overflowY: "auto"
      }}
    >
      <TextAnimation text={`${t("Special")}  ${t("Packages")}`} />
      {width < 500 ?
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "space-evenly",
          }}
        >
          {packages.map((pkg, index) => (
            <MobilePackages
              user_id={user_id}
              verificated={verificated}
              mybalance={mybalance}
              key={index}
              packageRating={pkg.packageRating}
              dailyEarnings={pkg.dailyEarnings}
              validTime={pkg.validTime}
              ratingIncome={pkg.ratingIncome}
              unlockPrice={pkg.unlockPrice}
            />))}
        </div> : <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "space-evenly",
          }}
        >
          {packages.map((pkg, index) => (
            <SpecialPackage
              user_id={user_id}
              verificated={verificated}
              mybalance={mybalance}
              key={index}
              packageRating={pkg.packageRating}
              dailyEarnings={pkg.dailyEarnings}
              validTime={pkg.validTime}
              ratingIncome={pkg.ratingIncome}
              unlockPrice={pkg.unlockPrice}
            />))}
        </div>}
    </div>
  );
};

export default PackagesSection;
