import React from "react";
import "./Record.css";
import { useTranslation } from "react-i18next";

const Record: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="record-container">
      <h1>{t("Your Transaction Records")}</h1>
      <ul className="record-list">
        <li>{t("Transaction 1: $200 - Completed")}</li>
        <li>{t("Transaction 2: $500 - Pending")}</li>
        <li>{t("Transaction 3: $100 - Failed")}</li>
      </ul>
    </div>
  );
};

export default Record;
