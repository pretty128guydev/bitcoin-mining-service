import React from "react";
import "./Record.css";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface RecordProps {
  setSelectedMenu: (data: any) => void
}

const Record: React.FC<RecordProps> = ({setSelectedMenu}) => {
  const navigate = useNavigate();
   const handleBack = () => {
    navigate("/", { state: { fromService: true } });
  };
  const { t } = useTranslation();
  return (
    <div style={{ background: "transparent", display: "flex", justifyContent: "center" }} >
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <div style={{ marginTop: "100px" }} className="record-container">
        <h3>INVEST ADDRESS HASN'T BEEN PREPARED NOT YET.</h3>
        <h3>COMMING SOON. SORRY</h3>
      </div>
    </div>
  );
};

export default Record;
