import React from "react";
import "./AboutUs.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  const { t } = useTranslation();
  return (
    <>
      <h2 className="aboutus-header">{t("About Us")}</h2>
      <div className="aboutus-container">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft />
        </button>
      </div>
    </>
  );
};

export default AboutUs;
