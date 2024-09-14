import React, { useState } from "react";
import "./FAQ.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("AboutUs");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  const renderContent = () => {
    switch (activeTab) {
      case "AboutUs":
        return (
          <div className="faq-content">
            <p>What is KWTVOK?</p>
            <p>Enterprise certificate</p>
          </div>
        );
      case "InvestPlus":
        return (
          <div className="faq-content">
            <p>Investment Options</p>
            <p>Investor Relations</p>
          </div>
        );
      case "Other":
        return (
          <div className="faq-content">
            <p>Support</p>
            <p>Feedback</p>
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
      <h2>FAQ</h2>
      <div className="faq-tabs">
        <button
          className={`faq-tab ${activeTab === "AboutUs" ? "active" : ""}`}
          onClick={() => setActiveTab("AboutUs")}
        >
          About Us
        </button>
        <button
          className={`faq-tab ${activeTab === "InvestPlus" ? "active" : ""}`}
          onClick={() => setActiveTab("InvestPlus")}
        >
          InvestPlus
        </button>
        <button
          className={`faq-tab ${activeTab === "Other" ? "active" : ""}`}
          onClick={() => setActiveTab("Other")}
        >
          Other
        </button>
      </div>
      <div className="faq-questions">{renderContent()}</div>
    </div>
  );
};

export default FAQ;
