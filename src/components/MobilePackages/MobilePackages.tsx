import React, { useContext, useEffect, useState } from "react";
import "./MobilePackages.css"; // Importing the CSS file
import StarRating from "../StarRating";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import CuteLoading from "../CuteLoading/CuteLoading"; // Import your loading component
import { MyContext } from "../../MyContext";

interface MobilePackagesProps {
  packageRating: number;
  dailyEarnings: string;
  validTime: string;
  ratingIncome: string;
  unlockPrice: string;
  mybalance: number;
  verificated: string;
  user_id: string;
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const MobilePackages: React.FC<MobilePackagesProps> = ({
  packageRating,
  dailyEarnings,
  validTime,
  ratingIncome,
  unlockPrice,
  verificated,
  user_id,
}) => {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const context = useContext(MyContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");
  const [balance_enough, setbalance_enough] = useState<boolean>(false);
  const { mybalance, setMybalance } = context; // Safely destructure from context
  const navigate = useNavigate();

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    if (verificated !== "verified") {
      setModalVisible(false);
      navigate("/menu/passport")
    } else {
      if (balance_enough) {
        setLoading(true);
        setModalVisible(false);
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_PORT}/api/update_payment_balance/${user_id}`,
            { unlockPrice: unlockPrice }
          )
          .then((response) => {
            setLoading(false);
            setMybalance(response.data.balance);
          })
          .catch((error) => {
            console.error("Error fetching messages", error);
          });
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_PORT}/api/update-package/${user_id}`,
            { packagePrice: unlockPrice, packageRole: dailyEarnings }
          )
          .then((response) => {
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching messages", error);
          });
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          setLoading(true);
          const decoded: JwtPayload = jwtDecode(token);
          const userId = decoded.id;

          if (Number(mybalance) < Number(unlockPrice)) {
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_PORT}/api/create_payment`,
                {
                  amount: unlockPrice,
                  sender_id: userId,
                  price_currency: "usdttrc20",
                }
              )
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
      }
    }
  };

  const unlockbutton = (unlockPrice: string) => {
    if (verificated !== "verified") {
      setmessage("You have to verify your passport information");
      setModalVisible(true);
    } else {
      if (Number(mybalance) < Number(unlockPrice)) {
        setmessage(
          `It lacks balance. You have to recharge wallet. Will you recharge $${unlockPrice} now?`
        );
        setModalVisible(true);
      } else {
        setbalance_enough(true);
        setmessage(`Will you purchase the ${unlockPrice} package now?`);
        setModalVisible(true);
      }
    }
  };

  return (
    <div className="mobile-packages">
      <div className="mobilepackage_container">
        <div className="mobilepackageDetails">
          <StarRating rating={packageRating} height={25} width={25}/>
          <div className="mobileratingIncome">
            <p className="mobilep">{t("Daily Earnings")}</p>
            <p className="mobiledayText">{dailyEarnings} {t("USD/day")}</p>
          </div>
          <div className="mobileratingIncome">
            <p className="mobilep">{t("Valid Time")}</p>
            <p className="mobiledayText">{validTime}</p>
          </div>
          <div className="mobileratingIncome">
            <p className="mobilep">{t("Rating income")}</p>
            <p className="mobileusdtText">{ratingIncome}</p>
          </div>
          <button
            className="mobileunlockButton"
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

export default MobilePackages;
