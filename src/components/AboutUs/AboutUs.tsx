import React from "react";
import "./AboutUs.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  return (
    <>
      <h2 className="aboutus-header">About Us</h2>
      <div className="aboutus-container">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft />
        </button>
      </div>
    </>
  );
};

export default AboutUs;
