import React from "react";
import "./OnlineService.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OnlineService: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  return (
    <div className="online-service-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>Online Service</h2>
      <p>Choose your preferred online customer service contact method</p>
      <div className="service-options">
        <div className="service-option">
          <img
            src="https://img.icons8.com/color/48/000000/telegram-app--v1.png"
            alt="Telegram"
          />
          <span>KWTVOK Official Channel</span>
        </div>
        <div className="service-option">
          <img
            src="https://img.icons8.com/color/48/000000/telegram-app--v1.png"
            alt="Telegram"
          />
          <span>Kwtvok 24H Service</span>
        </div>
        <div className="service-option">
          <img
            src="https://img.icons8.com/color/48/000000/whatsapp.png"
            alt="WhatsApp"
          />
          <span>Kwtvok 24H Service</span>
        </div>
      </div>
    </div>
  );
};

export default OnlineService;
