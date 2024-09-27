import React, { useContext } from "react";
import {
  ThunderboltOutlined,
  ProfileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons"; // Retain icons if needed
import "./Footer.css"; // Add CSS styling here
import { Badge } from "antd";
import { useTranslation } from "react-i18next";
import { MyContext } from "../MyContext";

interface CustomFooterProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

const CustomFooter: React.FC<CustomFooterProps> = ({
  selectedMenu,
  setSelectedMenu,
}) => {
  const handleMenuClick = (menuKey: string) => {
    setSelectedMenu(menuKey);
  };
  const { t } = useTranslation();
  const context = useContext(MyContext); // Access the context safely
  const { myunreadmessage, setMyunreadmessages } = context;

  return (
    <footer className="custom-footer">
      <div
        className={`footer-item ${selectedMenu === "news" ? "active" : ""}`}
        onClick={() => handleMenuClick("news")}
      >
        <ThunderboltOutlined style={{ fontSize: "25px" }} />
        <span>{t("NEWS")}</span>
      </div>
      <div
        className={`footer-item ${selectedMenu === "packages" ? "active" : ""}`}
        onClick={() => handleMenuClick("packages")}
      >
        <ProfileOutlined style={{ fontSize: "25px" }} />
        <span>{t("PACKAGES")}</span>
      </div>
      <div
        className={`footer-item ${selectedMenu === "referral" ? "active" : ""}`}
        onClick={() => handleMenuClick("referral")}
      >
        <SolutionOutlined style={{ fontSize: "25px" }} />
        <span>{t("INVITING")}</span>
      </div>
      <Badge count={myunreadmessage} size="small" color="#ff4d4f">
        <div
          className={`footer-item ${
            selectedMenu === "profile" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("profile")}
        >
          <UserOutlined style={{ fontSize: "25px" }} />
          <span>{t("PROFILE")}</span>
        </div>
      </Badge>
    </footer>
  );
};

export default CustomFooter;
