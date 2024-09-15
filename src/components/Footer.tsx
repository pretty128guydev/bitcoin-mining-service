import React from "react";
import {
  ThunderboltOutlined,
  ProfileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons"; // Retain icons if needed
import "./Footer.css"; // Add CSS styling here
import { Badge } from "antd";

interface CustomFooterProps {
  selectedMenu: string;
  unread_messages: string
  setSelectedMenu: (menu: string) => void;
}

const CustomFooter: React.FC<CustomFooterProps> = ({
  selectedMenu,
  setSelectedMenu,
  unread_messages
}) => {
  const handleMenuClick = (menuKey: string) => {
    setSelectedMenu(menuKey);
  };

  return (
    <footer className="custom-footer">
      <div
        className={`footer-item ${selectedMenu === "news" ? "active" : ""}`}
        onClick={() => handleMenuClick("news")}
      >
        <ThunderboltOutlined style={{ fontSize: "15px" }} />
        <span>NEWS</span>
      </div>
      <div
        className={`footer-item ${selectedMenu === "packages" ? "active" : ""}`}
        onClick={() => handleMenuClick("packages")}
      >
        <ProfileOutlined style={{ fontSize: "15px" }} />
        <span>PACKAGES</span>
      </div>
      <div
        className={`footer-item ${selectedMenu === "referral" ? "active" : ""}`}
        onClick={() => handleMenuClick("referral")}
      >
        <SolutionOutlined style={{ fontSize: "15px" }} />
        <span>INVITING</span>
      </div>
      <Badge count={unread_messages} size="small" color="#ff4d4f">
        <div
          className={`footer-item ${
            selectedMenu === "profile" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("profile")}
        >
          <UserOutlined style={{ fontSize: "15px" }} />
          <span>PROFILE</span>
        </div>
      </Badge>
    </footer>
  );
};

export default CustomFooter;
