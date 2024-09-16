import React from "react";
import "./AppDownload.css";
import { useTranslation } from "react-i18next";

const AppDownload: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="app-download-container">
      <h1>{t("Download Our App")}</h1>
      <p>
        {t(
          "For the best experience, download our mobile app from the links below:"
        )}
      </p>

      <div className="download-links">
        <a href="#" className="download-btn">
          {t("Download for iOS")}
        </a>
        <a href="#" className="download-btn">
          {t("Download for Android")}
        </a>
      </div>
    </div>
  );
};

export default AppDownload;
