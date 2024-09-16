import React, { useState } from "react";
import "./FAQ.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("AboutUs");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  const renderContent = () => {
    switch (activeTab) {
      case "AboutUs":
        return (
          <div className="faq-content">
            <p>{t("What is KWTVOK?")}</p>
            <p>{t("Enterprise certificate")}</p>
          </div>
        );
      case "InvestPlus":
        return (
          <div className="faq-content">
            <p>{t("Investment Options")}</p>
            <p>{t("Investor Relations")}</p>
          </div>
        );
      case "Other":
        return (
          <div className="faq-content">
            <p>{t("Support")}</p>
            <p>{t("Feedback")}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="faq-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("FAQ")}</h2>
      <div className="faq-tabs">
        <button
          className={`faq-tab ${activeTab === "AboutUs" ? "active" : ""}`}
          onClick={() => setActiveTab("AboutUs")}
        >
          {t("About Us")}
        </button>
        <button
          className={`faq-tab ${activeTab === "InvestPlus" ? "active" : ""}`}
          onClick={() => setActiveTab("InvestPlus")}
        >
          {t("InvestPlus")}
        </button>
        <button
          className={`faq-tab ${activeTab === "Other" ? "active" : ""}`}
          onClick={() => setActiveTab("Other")}
        >
          {t("Other")}
        </button>
      </div>
      <div className="faq-questions">{renderContent()}</div>
    </div>
  );
};

export default FAQ;
