import React, { useState } from "react";
import "./SpecialPackage.css"; // Importing the CSS file
import StarRating from "./StarRating";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import CuteLoading from "./CuteLoading/CuteLoading"; // Import your loading component

interface SpecialPackageProps {
  packageRating: number;
  dailyEarnings: string;
  validTime: string;
  ratingIncome: string;
  unlockPrice: string;
  balance: string;
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const SpecialPackage: React.FC<SpecialPackageProps> = ({
  packageRating,
  dailyEarnings,
  validTime,
  ratingIncome,
  unlockPrice,
  balance,
}) => {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;

      if (Number(balance) < Number(unlockPrice)) {
        axios
          .post(`${process.env.REACT_APP_BACKEND_PORT}/api/create_payment`, {
            amount: unlockPrice,
            sender_id: userId,
            price_currency: "usd",
          })
          .then((response) => {
            setLoading(false);
            const paymentId = response?.data?.invoice_id;
            window.location.href = `https://nowpayments.io/payment?iid=${paymentId}`;
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      } else {
      }
    } else {
      console.log(`No token found.`);
    }
  };

  const unlockbutton = (unlockPrice: string) => {
    console.log(balance, unlockPrice);
    if (Number(balance) < Number(unlockPrice)) {
      setmessage(
        `It lacks balance. You have to recharge wallet. Will you recharge $${unlockPrice} now?`
      );
      setModalVisible(true);
    } else {
      setmessage(`Will you purchase the ${unlockPrice} package now?`);
      setModalVisible(true);
    }
  };

  return (
    <div>
      <div className="package_container">
        <div className="packageDetails">
          <StarRating rating={packageRating} />
          <div className="ratingIncome">
            <p>{t("Daily Earnings")}</p>
            <p className="dayText">{dailyEarnings}</p>
          </div>
          <div className="ratingIncome">
            <p>{t("Valid Time")}</p>
            <p className="dayText">{validTime}</p>
          </div>
          <div className="ratingIncome">
            <p>{t("Rating income")}</p>
            <p className="usdtText">{ratingIncome}</p>
          </div>
          <button
            className="unlockButton"
            onClick={() => unlockbutton(unlockPrice)}
          >
            {unlockPrice} {t("USDT")} {t("Unlock now")}
          </button>
        </div>
      </div>
      {modalVisible && (
        <div>
          <ConfirmationModal
            message={message}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      )}
      {loading && <CuteLoading />} {/* Show loading spinner when processing */}
    </div>
  );
};

export default SpecialPackage;
