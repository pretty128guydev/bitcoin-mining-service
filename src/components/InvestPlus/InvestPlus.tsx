import React from "react";
import "./InvestPlus.css";
import useWindowSize from "../../hooks/useWindowSize";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const options = [
  {
    period: 3,
    dailyReturnRate: 0.5,
    minInvestment: 100,
    periodicAmount: 101.5,
    isActive: false,
  },
  {
    period: 7,
    dailyReturnRate: 1.0,
    minInvestment: 100,
    periodicAmount: 107.0,
    isActive: false,
  },
  {
    period: 15,
    dailyReturnRate: 3.0,
    minInvestment: 100,
    periodicAmount: 145.0,
    isActive: false,
  },
  {
    period: 30,
    dailyReturnRate: 4.0,
    minInvestment: 100,
    periodicAmount: 220.0,
    isActive: false,
  },
  {
    period: 60,
    dailyReturnRate: 5.0,
    minInvestment: 100,
    periodicAmount: 400.0,
    isActive: false,
  },
  {
    period: 120,
    dailyReturnRate: 8.0,
    minInvestment: 100,
    periodicAmount: 1060.0,
    isActive: false,
  },
];

const InvestPlus: React.FC = () => {
  const width = useWindowSize() ?? 0;
  const navigate = useNavigate();
  const handleBack = () => {
   navigate("/", { state: { fromService: true } });
 };
  const { t } = useTranslation();
  const invest = () => {
    navigate(`/menu/record`);
  };
  return (
    <div className="investment-options">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("Invest Plus")}</h2>
      {width < 525
        ? options.map((option, index) => (
            <div className="investment-card">
              <div className="sm-investment-header">
                <span>
                  {option.period} {t("days investment rights")}
                </span>
                <span className="sm-daily-return">
                  {t("Daily return rate")} {option.dailyReturnRate}%
                </span>
              </div>
              <div className="sm-investment-details">
                <div className="sm-investment-info">
                  <p>
                    {t("Minimum Investment amount")}{" "}
                    <strong>
                      {option.minInvestment} {t("USDT")}
                    </strong>
                  </p>
                  <p>
                    {t("Investment period")}{" "}
                    <strong>
                      {option.period} {t("Days")}
                    </strong>
                  </p>
                  <p>
                    {t("Periodic principal and interest")}{" "}
                    <strong>
                      {option.periodicAmount} {t("USDT")}
                    </strong>
                  </p>
                </div>
                <button className="invest-button" onClick={invest}>
                  {t("Invest now")}
                </button>
              </div>
            </div>
          ))
        : options.map((option, index) => (
            <div className="investment-card">
              <div className="investment-header">
                <span>
                  {option.period} {t("days investment rights")}
                </span>
                <span className="daily-return">
                  {t("Daily return rate")} {option.dailyReturnRate}%
                </span>
              </div>
              <div className="investment-details">
                <div className="investment-info">
                  <p>
                    {t("Minimum Investment amount")}{" "}
                    <strong>
                      {option.minInvestment} {t("USDT")}
                    </strong>
                  </p>
                  <p>
                    {t("Investment period")}{" "}
                    <strong>
                      {option.period} {t("Days")}
                    </strong>
                  </p>
                  <p>
                    {t("Periodic principal and interest")}{" "}
                    <strong>
                      {option.periodicAmount} {t("USDT")}
                    </strong>
                  </p>
                </div>
                <button className="invest-button" onClick={invest}>
                  {t("Invest now")}
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default InvestPlus;
