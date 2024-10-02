import React, { useEffect, useState } from "react";
import { Card } from "antd";
import SpecialPackage from "./SpecialPackage";
import TextAnimation from "./TextAnimation";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import useWindowSize from "../hooks/useWindowSize";
import MobilePackages from "./MobilePackages/MobilePackages";
import CuteLoading from "./CuteLoading/CuteLoading";

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
  const [loading, setLoading] = useState(false);
  const [modifiedPackages, setModifiedPackages] = useState<any[]>([]);

  // Define the package data
  const packages = [
    {
      packageRating: 1,
      ratingIncome: "$50",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `1.5`,
      unlockPrice: "50",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 2,
      ratingIncome: "$130",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `3.9`,
      unlockPrice: "130",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 3,
      ratingIncome: "$280",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `8.4`,
      unlockPrice: "280",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 4,
      ratingIncome: "$340",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `10.2`,
      unlockPrice: "340",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 5,
      ratingIncome: "$500",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `15`,
      unlockPrice: "500",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 6,
      ratingIncome: "$1000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `30`,
      unlockPrice: "1000",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 7,
      ratingIncome: "$2000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `60`,
      unlockPrice: "2000",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 8,
      ratingIncome: "$3000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `90`,
      unlockPrice: "3000",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 9,
      ratingIncome: "$5000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `150`,
      unlockPrice: "5000",
      purchased: "",
      disabled: ""
    },
    {
      packageRating: 10,
      ratingIncome: "$10000",
      validTime: `60 ${t("days")}`,
      dailyEarnings: `300`,
      unlockPrice: "10000",
      purchased: "",
      disabled: ""
    },
  ];


  useEffect(() => {
    setLoading(true);
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      setuser_id(userId);
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get-passport/${userId}`)
        .then((response) => {
          setverificated(response.data.passport_verificated);
          axios
            .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get_user_id/${userId}`)
            .then((response) => {
              setLoading(false);

              // Determine the user's highest purchased package
              const highestPurchasedPackage = Number(response.data.package_role);

              // Update the packages array based on the package_status and package_role
              let updatedPackages = packages.map((pkg) => {
                const isPurchased = Number(pkg.dailyEarnings) === highestPurchasedPackage;

                // If the package price is greater than 2000 and the user hasn't purchased a 1000+ package, disable it
                const shouldDisable = Number(pkg.unlockPrice) >= 2000 && response.data.package_price < 1000;

                return {
                  ...pkg,
                  validTime: isPurchased ? `${response.data.package_remain} ${t("days")}` : pkg.validTime,
                  dailyEarnings: isPurchased ? response.data.package_role : pkg.dailyEarnings,
                  unlockPrice: isPurchased ? response.data.package_price : pkg.unlockPrice,
                  purchased: isPurchased ? "yes" : "",
                  disabled: shouldDisable ? "yes" : "", // Mark as disabled
                };
              });

              setModifiedPackages(updatedPackages);
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error fetching messages", error);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching messages", error);
        });
    } else {
      console.log("no token found");
    }
  }, []);




  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <TextAnimation text={`${t("Special")}  ${t("Packages")}`} />
      {width < 500 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "space-evenly",
          }}
        >
          {modifiedPackages.map((pkg, index) => (
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
              purchased={pkg.purchased}
              disabled={pkg.disabled}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "space-evenly",
          }}
        >
          {modifiedPackages.map((pkg, index) => (
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
              purchased={pkg.purchased}
              disabled={pkg.disabled}
            />
          ))}
        </div>
      )}
      {loading && <CuteLoading />} {/* Show loading spinner when processing */}
    </div>
  );
};

export default PackagesSection;
