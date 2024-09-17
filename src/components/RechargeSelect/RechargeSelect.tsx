import React from "react";
import "./RechargeSelect.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Option {
  id: string;
  label: string;
  icon: string;
}

interface RechargeSelectProps {
  options: Option[]; // Allow passing custom options for cryptos
}

const RechargeSelect: React.FC<RechargeSelectProps> = ({ options }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  const handleOptionClick = (id: string) => {
    // Navigate to the recharge page with the selected crypto
    navigate(`/recharge/${id}`);
  };

  return (
    <div className="recharge-select-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <div className="header">
        <span className="title">{t("Recharge Select")}</span>
      </div>
      <div className="options-list">
        {options.map((option) => (
          <div className="option" key={option.id} onClick={() => handleOptionClick(option.id)}>
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
