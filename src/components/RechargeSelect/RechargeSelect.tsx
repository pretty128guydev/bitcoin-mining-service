import React from "react";
import "./RechargeSelect.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { wait } from "@testing-library/user-event/dist/utils";

interface Option {
  id: string;
  label: string;
  icon: string;
  price_currency: string;
}

interface RechargeSelectProps {
  options: Option[]; // Allow passing custom options for cryptos
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const RechargeSelect: React.FC<RechargeSelectProps> = ({ options }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { amount } = useParams();
  const handleBack = () => {
   navigate("/", { state: { fromService: true } });
 };

  const handleOptionClick = async (
    id: string,
    label: string,
    price_currency: string
  ) => {
    navigate(`/menu/rechargeSelect/${label}`);
  };

  return (
    <div className="recharge-select-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>

      <div className="header">
        <span className="title">{t("Select Wallet")}</span>
      </div>
      <div className="options-list">
        {options.map((option) => (
          <div
            className="option"
            key={option.id}
            onClick={() =>
              handleOptionClick(option.id, option.label, option.price_currency)
            }
          >
            <div style={{ display: "flex" }}>
              <div className={`icon ${option.icon}`}></div>
              <span className="option-crypto">{option.label}</span>
            </div>
            <div className="arrow">{">"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RechargeSelect;
