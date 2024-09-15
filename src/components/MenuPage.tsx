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

  return (
    <div className="menu-page">
      <div className="menu-options">
        <MenuOption
          icon={<AiOutlineSetting />}
          label="InvestPlus"
          onClick={() => handleClick("investplus")}
        />
        <MenuOption
          icon={<FaGlobe />}
          label="Official Website"
          onClick={() => setSelectedMenu("/news")}
        />
        <MenuOption
          icon={<FaQuestionCircle />}
          label="FAQ"
          onClick={() => handleClick("faq")}
        />
        <MenuOption
          icon={<FaLock />}
          label="Login Password"
          onClick={() => handleClick("login-password")}
        />
        {/* <MenuOption
          icon={<FaLock />}
          label="Security Password"
          onClick={() => handleClick("security-password")}
        /> */}
        <MenuOption
          icon={<FaEnvelope />}
          label="Record"
          onClick={() => handleClick("record")}
        />
      </div>
      <div className="menu-separator"></div> {/* Separator for sections */}
      <div className="menu-options">
        <MenuOption
          icon={<AiOutlineInfoCircle />}
          label="Contact Customer Service"
          onClick={() => handleClick("online-service")}
        />
        <MenuOption
          icon={<AiOutlineGlobal />}
          label="Switch Language"
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
            label="Notification"
            onClick={() => handleClick("notification")}
          />
        </Badge>
        <MenuOption
          icon={<AiOutlineInfoCircle />}
          label="About Us"
          onClick={() => handleClick("about-us")}
        />
        <MenuOption
          icon={<FaMobileAlt />}
          label="APP Download"
          onClick={() => {}}
        />
      </div>
      <div className="menu-separator"></div> {/* Separator for sections */}
      <div className="logout">
        <button className="logout-button" onClick={handleLogout}>
          <AiOutlineLogout />
          LogOut
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
