import React, { useContext, useState } from "react";
import { MyContext } from "../MyContext"; // Import the context
import { Badge } from "antd"; // For Badge component
import {
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineGlobal,
  AiOutlineSetting,
} from "react-icons/ai";
import {
  FaBell,
  FaGlobe,
  FaLock,
  FaEnvelope,
  FaQuestionCircle,
  FaMobileAlt,
} from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import MenuOption from "./MenuOption"; // Assuming both files are in the same folder
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import CuteLoading from "./CuteLoading/CuteLoading";
import { FaMoneyCheckAlt } from "react-icons/fa";

interface MenuPageProps {
  setSelectedMenu: (data: any) => void;
  mybalance: number;
}
interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const MenuPage: React.FC<MenuPageProps> = ({ setSelectedMenu }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(MyContext); // Access the context safely
  const { myunreadmessage, setMyunreadmessages } = context; // Safely destructure from context
  const { mybalance, setMybalance } = context; // Safely destructure from context

  const handleClick = (label: string) => {
    console.log(`${label} clicked`);
    navigate(`/menu/${label}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  const Deposit = () => {};

  const handleConfirm = (amount: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;

      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/create_payment`, {
          amount: amount,
          sender_id: userId,
          price_currency: "usd",
        })
        .then((response) => {
          setLoading(false);
          const paymentId = response?.data?.invoice_id;
          window.location.href = `https://nowpayments.io/payment?iid=${paymentId}`;
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    } else {
      console.log(`No token found.`);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const Recharge = () => {
    setModalVisible(true);
  };

  return (
    <div className="menu-page">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>MY BALANCE: ${mybalance}</h1>
      </div>
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
          icon={<FaLock />}
          label="Login Password"
          onClick={() => handleClick("login-password")}
        />
        <MenuOption
          icon={<FaEnvelope />}
          label="Passport Verify"
          onClick={() => handleClick("passport")}
        />
        <MenuOption
          icon={<BsFillLightningChargeFill />}
          label="Recharge My Wallet"
          onClick={() => Recharge()}
        />
        <MenuOption
          icon={<FaMoneyCheckAlt />}
          label="Deposit"
          onClick={() => handleClick("rechargeSelect")}
        />
      </div>
      <div className="menu-separator"></div> {/* Separator for sections */}
      <div className="menu-options">
        <MenuOption
          icon={<FaQuestionCircle />}
          label="FAQ"
          onClick={() => handleClick("faq")}
        />
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
          count={myunreadmessage} // Use the global state here
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
      {modalVisible && (
        <div>
          <ConfirmationModal
            message={""}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            recharge={true}
          />
        </div>
      )}
      {loading && <CuteLoading />} {/* Show loading spinner when processing */}
    </div>
  );
};

export default MenuPage;
