import React, { useState } from "react";
import "./FAQ.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Collapse, CollapseProps } from "antd";


interface FAQProps {
  setSelectedMenu: (data: any) => void
}

const FAQ: React.FC<FAQProps> = ({ setSelectedMenu }) => {
  const [activeTab, setActiveTab] = useState("AboutUs");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    navigate(-1) // Navigates to the previous page
  };

  const text1 = `
  ${t("Bitcoin mining. is the process by which new bitcoins are created and transactions are verified on the Bitcoin network. It involves using specialized computers (called mining rigs) to solve complex mathematical problems. These problems help secure the Bitcoin network and confirm transactions..")}`;
  const text2_1 = `
  ${t("1. Transaction Verification: Whenever someone sends Bitcoin, that transaction needs to be verified. Miners group transactions into blocks and solve complex mathematical puzzles to verify them.")}`;
  const text2_2 = `${t("2. Solving the Puzzle: The mining computers compete to solve these puzzles. The first one to solve it gets to add the new block of transactions to the blockchain.")}  `;
  const text2_3 = `${t("3. Rewards: In return for their work, the miner who solves the puzzle first is rewarded with newly minted Bitcoin and transaction fees. This reward system incentivizes miners to keep the network secure.")}
  `;
  const text2_4 = `${t("4. Decentralized System: Bitcoin mining is decentralized, meaning no single entity controls it. Instead, miners from all over the world contribute computing power to keep the system running smoothly.")}
  `;
  const text2_5 = `
  ${t("In short, Bitcoin mining is the backbone of the Bitcoin network, ensuring its security and functionality while generating new bitcoins.")}`;
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: `${t("What's bitcoin")}`,
      children: <p>{text1}</p>,
    },
    {
      key: "2",
      label: `${t("how it works")}`,
      children: (
        <>
          <p>{text2_1}</p>
          <p>{text2_2}</p>
          <p>{text2_3}</p>
          <p>{text2_4}</p>
          <p>{text2_5}</p>
        </>
      ),
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const renderContent = () => {
    switch (activeTab) {
      case "AboutUs":
        return (
          <Collapse
            style={{ border: "0px", color: "#fff" }}
            onChange={onChange}
            items={items}
          />
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
