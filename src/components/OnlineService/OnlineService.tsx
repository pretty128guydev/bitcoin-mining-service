import React from "react";
import "./OnlineService.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OnlineService: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  const { t } = useTranslation();
  return (
    <div className="online-service-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("Online Service")}</h2>
      <p>{t("Choose your preferred online customer service contact method")}</p>
      <div className="service-options">
        <div className="service-option">
          <img
            src="https://img.icons8.com/color/48/000000/telegram-app--v1.png"
            alt={t("Telegram")}
          />
          <span>{t("Myminings official channel")}</span>
        </div>
        <div className="service-option">
          <img
            src="https://img.icons8.com/color/48/000000/telegram-app--v1.png"
            alt={t("Telegram")}
          />
          <span>{t("Myminings 24h service")}</span>
        </div>
        <div className="service-option">
          <img
            src="https://img.icons8.com/color/48/000000/whatsapp.png"
            alt={t("WhatsApp")}
          />
          <span>{t("Myminings 24h service")}</span>
        </div>
      </div>
    </div>
  );
};

export default OnlineService;
