import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";
import "./LanguagePicker.css";

interface Language {
  code: string;
  label: string;
  flagCode: string; // Use 2-letter country code for flag
}

const languages: Language[] = [
  { code: "en", label: "English", flagCode: "US" },
  { code: "fr", label: "French", flagCode: "FR" },
  { code: "it", label: "Italiano", flagCode: "IT" },
  { code: "ja", label: "日本語", flagCode: "JP" },
  { code: "de", label: "Deutsch", flagCode: "DE" },
  { code: "ru", label: "Русский", flagCode: "RU" },
  { code: "vi", label: "Tiếng Việt", flagCode: "VN" },
  { code: "pt", label: "Português", flagCode: "PT" },
  { code: "tr", label: "Türkçe", flagCode: "TR" },
  { code: "es", label: "español", flagCode: "ES" },
  { code: "fa", label: "فارسی", flagCode: "IR" },
  { code: "ar", label: "عربي", flagCode: "SA" },
  { code: "id", label: "Indonesia", flagCode: "ID" },
  { code: "el", label: "Ελληνικά", flagCode: "GR" },
  { code: "ms", label: "Melayu", flagCode: "MY" },
  { code: "th", label: "ภาษาไทย", flagCode: "TH" },
  { code: "la", label: "Latinus", flagCode: "VA" }, // Vatican for Latin
  { code: "hi", label: "हिंदी", flagCode: "IN" },
];

const LanguagePicker: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleChangeLanguage = (code: string) => {
    setSelectedLanguage(code);
    localStorage.setItem("selectedLanguage", code);
    i18n.changeLanguage(code);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="header-language-picker" style={{ height: "47px" }}>
      <div
        className="header-selected-language"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Flag
          code={languages.find((lang) => lang.code === selectedLanguage)?.flagCode!}
          style={{ width: "24px", height: "18px", marginRight: "8px" }}
        />
        {languages.find((lang) => lang.code === selectedLanguage)?.label}
        <span className="header-dropdown-arrow">{isDropdownOpen ? "▲" : "▼"}</span>
      </div>

      {isDropdownOpen && (
        <ul className="header-language-dropdown">
          {languages.map((language) => (
            <li
              key={language.code}
              className={`header-language-option ${
                selectedLanguage === language.code ? "selected" : ""
              }`}
              onClick={() => handleChangeLanguage(language.code)}
            >
              <Flag
                code={language.flagCode}
                style={{ width: "24px", height: "18px", marginRight: "8px" }}
              />
              <span className="label">{language.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguagePicker;
