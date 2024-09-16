import React from "react";
import MenuOption from "./MenuOption"; // Assuming both files are in the same folder
import {
  FaLock,
  FaQuestionCircle,
  FaGlobe,
  FaEnvelope,
  FaBell,
  FaMobileAlt,
} from "react-icons/fa"; // For Icons
import {
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineGlobal,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { useTranslation } from "react-i18next";

interface MenuPageProps {
  setSelectedMenu: (data: any) => void;
  unread_messages: string;
}

const MenuPage: React.FC<MenuPageProps> = ({
  setSelectedMenu,
  unread_messages,
}) => {
  const navigate = useNavigate();
  // Handle Menu Click Events (just a placeholder for now)
  const handleClick = (label: string) => {
    console.log(`${label} clicked`);
    navigate(`/menu/${label}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };
  const { t } = useTranslation();

  return (
    <div className="menu-page">
      <div className="menu-options">
        <MenuOption
          icon={<AiOutlineSetting />}
          label={t("InvestPlus")}
          onClick={() => handleClick("investplus")}
        />
        <MenuOption
          icon={<FaGlobe />}
          label={t("Official Website")}
          onClick={() => setSelectedMenu("/news")}
        />
        <MenuOption
          icon={<FaQuestionCircle />}
          label={t("FAQ")}
          onClick={() => handleClick("faq")}
        />
        <MenuOption
          icon={<FaLock />}
          label={t("Login Password")}
          onClick={() => handleClick("login-password")}
        />
        {/* <MenuOption
          icon={<FaLock />}
          label="Security Password"
          onClick={() => handleClick("security-password")}
        /> */}
        <MenuOption
          icon={<FaEnvelope />}
          label={t("Record")}
          onClick={() => handleClick("record")}
        />
      </div>
      <div className="menu-separator"></div> {/* Separator for sections */}
      <div className="menu-options">
        <MenuOption
          icon={<AiOutlineInfoCircle />}
          label={t("Contact Customer Service")}
          onClick={() => handleClick("online-service")}
        />
        <MenuOption
          icon={<AiOutlineGlobal />}
          label={t("Switch Language")}
          onClick={() => handleClick("switch-language")}
        />
        <Badge
          count={unread_messages}
          size="small"
          color="#ff4d4f"
          styles={{ root: { width: "100%" } }}
        >
          <MenuOption
            icon={<FaBell />}
            label={t("Notification")}
            onClick={() => handleClick("notification")}
          />
        </Badge>
        <MenuOption
          icon={<AiOutlineInfoCircle />}
          label={t("About Us")}
          onClick={() => handleClick("about-us")}
        />
        <MenuOption
          icon={<FaMobileAlt />}
          label={t("APP Download")}
          onClick={() => {}}
        />
      </div>
      <div className="menu-separator"></div> {/* Separator for sections */}
      <div className="logout">
        <button className="logout-button" onClick={handleLogout}>
          <AiOutlineLogout />
          {t("LogOut")}
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
