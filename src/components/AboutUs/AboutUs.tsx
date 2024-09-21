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
        <p className="about_us_info">
          {" "}
          Welcome to our Bitcoin mining farm, where we make cryptocurrency
          mining simple and profitable for everyone. Our mission is to offer
          accessible investment opportunities with packages starting from just
          $50. Whether you’re a beginner or an experienced investor, we provide
          cutting-edge mining equipment that delivers consistent returns. With
          our transparent and reliable system, you can enjoy a 1.8% return on
          your investment in just 2 months. We handle the technical side, so you
          can sit back and watch your investment grow! Join us today and be part
          of the future of digital finance!
        </p>
      </div>
    </>
  );
};

export default AboutUs;
