import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./SwitchLanguage.css";

interface Language {
  code: string;
  label: string;
}

const languages: Language[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "pt", label: "Português" },
  { code: "tr", label: "Türkçe" },
  { code: "es", label: "español" },
  { code: "fa", label: "فارسی" },
  { code: "ar", label: "عربي" },
  { code: "id", label: "bahasa Indonesia" },
  { code: "el", label: "Ελληνικά" },
  { code: "ms", label: "Melayu" },
  { code: "th", label: "ภาษาไทย" },
  { code: "la", label: "Latinus" },
  { code: "hi", label: "हिंदी" },
];

const SwitchLanguage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const { t, i18n: {changeLanguage, language} } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleChangeLanguage = (code: string) => {
    setSelectedLanguage(code);
    localStorage.setItem("selectedLanguage", code);

    changeLanguage(code);
  };
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="language-picker">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("Switch Language")}</h2>
      <ul className="language-list">
        {languages.map((language) => (
          <li
            key={language.code}
            className={`language-item ${
              selectedLanguage === language.code ? "selected" : ""
            }`}
            onClick={() => handleChangeLanguage(language.code)}
          >
            {language.label}
            {selectedLanguage === language.code && (
              <span className="checkmark">✔</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SwitchLanguage;
