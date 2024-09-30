// src/App.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./contexts/AuthContext";
import backgroundImage from "./assets/background.png";
import mobile_back from "./assets/mobile_back.png";
import useWindowSize from "./hooks/useWindowSize";
import toast, { Toaster } from "react-hot-toast";
import InvestPlus from "./components/InvestPlus/InvestPlus";
import FAQ from "./components/FAQ/FAQ";
import LoginPassword from "./components/LoginPassword/LoginPassword";
import SecurityPassword from "./components/SecurityPassword/SecurityPassword";
import Record from "./components/Record/Record";
import SwitchLanguage from "./components/SwitchLanguage/SwitchLanguage";
import AboutUs from "./components/AboutUs/AboutUs";
import Notification from "./components/Notification/Notification";
import AppDownload from "./components/AppDownload/AppDownload";

import "./i18n";
import OnlineService from "./components/OnlineService/OnlineService";
import RechargeSelect from "./components/RechargeSelect/RechargeSelect";
import Recharge from "./components/RechargeSelect/Recharge/Recharge";

import {
  useWallet,
  WalletProvider,
} from "@tronweb3/tronwallet-adapter-react-hooks";
import {
  WalletModalProvider,
  WalletActionButton,
} from "@tronweb3/tronwallet-adapter-react-ui";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
import {
  WalletDisconnectedError,
  WalletError,
  WalletNotFoundError,
} from "@tronweb3/tronwallet-abstract-adapter";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UpdatePassportInfo from "./components/UpdatePassportInfo/UpdatePassportInfo";
import { io } from "socket.io-client";
import { MyContext } from "./MyContext";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";
import { TbMessagePlus } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import TransferAmount from "./components/TransferAmount/TransferAmount";
import FlexibleWallet from "./components/FlexibleWallet/FlexibleWallet";

const { Content } = Layout;

const RechargeWrapper: React.FC = () => {
  const { cryptoId } = useParams(); // Get the cryptoId from the URL

  // Map cryptoId to corresponding data
  const cryptoDataMap: Record<
    string,
    { mainnetType: string; depositAddress: string; qrCodeUrl: string }
  > = {
    "TRC20-USDT": {
      mainnetType: "TRC20-USDT",
      depositAddress: "TR7kbVZnRByZpoMrf4YrLQ4aJi6FQbaZ5c",
      qrCodeUrl: "https://api.kwtvok.cc/static/image/trc20-usdt.jpg",
    },
    TRX: {
      mainnetType: "TRX",
      depositAddress: "TMkPZVNRYzpoMrf4YlQaJ56qFQba75pL2d",
      qrCodeUrl: "https://api.kwtvok.cc/static/image/trx.webp",
    },
    "BEP20-USDT": {
      mainnetType: "BEP20-USDT",
      depositAddress: "BNQp123BNYPQR4lKqgFZPba75YlQaJfCZ2",
      qrCodeUrl: "https://api.kwtvok.cc/static/image/bep20-usdt.webp",
    },
    BNB: {
      mainnetType: "BNB",
      depositAddress: "BNqPz4NyBZR4YlQa75JfQ7CZPZPba69J2",
      qrCodeUrl: "https://api.kwtvok.cc/static/image/bnb.webp",
    },
  };

  // Get the data for the selected cryptoId, or fallback to some default
  const cryptoData = cryptoDataMap[cryptoId ?? "trc20-usdt"];

  return (
    <Recharge
      mainnetType={cryptoData.mainnetType}
      depositAddress={cryptoData.depositAddress}
      qrCodeUrl={cryptoData.qrCodeUrl}
    />
  );
};

declare global {
  interface Window {
    tronWeb: any;
  }
}

interface Message {
  messageId: number;
  createdAt: string;
  content: string;
  senderId: number;
  senderFirstName: string;
  senderLastName: string;
  senderEmail: string;
  senderPhoneNumber: string;
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const App: React.FC = () => {
  const context = useContext(MyContext);
  const { myunreadmessage, setMyunreadmessages } = context; // Safely destructure from context
  const { package_status, setpackage_status } = context; // Safely destructure from context
  const { package_remain, setpackage_remain } = context; // Safely destructure from context
  const { package_role, setpackage_role } = context; // Safely destructure from context
  const { selectedMenu, setSelectedMenu } = context; // Safely destructure from context
  const { mybalance, setMybalance } = context; // Safely destructure from context
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const [actually_paid, setactually_paid] = useState<number>(0);
  const [packageprice, setpackageprice] = useState<number>(0);
  const REACT_APP_BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

  const socket = io(`${REACT_APP_BACKEND_PORT}`, { path: '/socket.io/' });

  const token = localStorage.getItem("token");

  const handleConfirm = () => {
    setSelectedMenu("packages")
  }

  const handleCancel = () => {
    setModalVisible(false);
    setactually_paid(0);
  };

  const pahandleConfirm = () => {
    setModalVisible(false);
    setpackageprice(0);
    setSelectedMenu("news")
  }

  const pahandleCancle = () => {
    setModalVisible(false);
    setpackageprice(0);
  };
  // const userId = getAuthUser();

  useEffect(() => {
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      axios
        .get(`${process.env.REACT_APP_BACKEND_PORT}/api/user/${userId}/unread`)
        .then((response) => {
          setMyunreadmessages(response.data.length);
          if (response.data.length !== 0) {
            toast(`${response.data.length} ${t("new messages have arrived for you.")}`, {
              icon: '👏',
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get-balance/${userId}`)
        .then((response) => {
          setMybalance(response.data.balance);
          setpackage_status(response.data.package_remain.package_status)
          setpackage_remain(response.data.package_remain.package_remain)
          setpackage_role(response.data.package_remain.package_role)
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });
    } else {
      console.log("no token found");
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;

      // Listen for balance response
      socket.on("package_bought", (balance, newbalance, user_id) => {
        if (user_id == Number(userId)) {
          setMybalance(balance);
          setpackageprice(newbalance);
        }
      });

      socket.on("balanceResponse", (balance, actually_paid, user_id) => {
        if (user_id == Number(userId)) {
          setMybalance(balance);
          if (!actually_paid) {
            setactually_paid(actually_paid);
          }
        }
      });


      socket.on(
        "depositadmin",
        (actually_paid, user_id, name) => {
          if (user_id == 1) {
            toast(`${name} ${t("did deposit")} $${actually_paid}.`, {
              icon: '👏',
            });
          }
        }
      );

      socket.on("updatebalance", (balance, user_id) => {
        if (user_id == Number(userId)) {
          setMybalance(balance);
        }
      });

      // Listen for balance response
      socket.on(
        "unreadMessagesResponse",
        (unread_messages: number, user_id: number) => {
          if (user_id == Number(userId)) {
            setMyunreadmessages(unread_messages);
            // toast.info(`${unread_messages} new messages have arrived for you.`)
            toast(`${unread_messages} ${t("new messages have arrived for you.")}`, {
              icon: '👏',
            });
          }
        }
      );
    } else {
      console.log("no token found");
    }
  }, []);

  // axios
  //   .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get-balance/${id}`)
  //   .then((res) => {
  //     console.log(res.data);
  //     setBalance(res.data.balance);
  //   })
  //   .catch((err) => console.log(err));
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const width = useWindowSize() ?? 0;
  const options = [
    {
      id: "usdttrc20",
      label: "TRC20-USDT",
      icon: "trc20-usdt-icon",
      price_currency: "usd",
    },
    { id: "trx", label: "TRX", icon: "trx-icon", price_currency: "usd" },
    {
      id: "bnbbsc",
      label: "BEP20-USDT",
      icon: "bep20-usdt-icon",
      price_currency: "usd",
    },
    { id: "bnbbsc", label: "BNB", icon: "bnb-icon", price_currency: "bnbbsc" },
  ];

  return (
    <Router>
      <Layout
        style={{
          minHeight: "100vh",
          //   backgroundImage:
          //     width > 425 ? `url(${backgroundImage})` : `url(${mobile_back})`, // Set the background image
          //   backgroundSize: width > 425 ? "cover" : "100% 100%",
          //   backgroundPosition: width > 425 ? `left center` : `center center`,
          backgroundColor: "#13182f",
        }}
      >
        <Content>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Dashboard mybalance={mybalance} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/register/:code" element={<Register />} />
            <Route path="/menu/investplus" element={<InvestPlus />} />
            <Route path="/menu/faq" element={<FAQ setSelectedMenu={setSelectedMenu} />} />
            <Route path="/menu/login-password" element={<LoginPassword />} />
            <Route
              path="/menu/security-password"
              element={<SecurityPassword />}
            />
            <Route path="/menu/record" element={<Record setSelectedMenu={setSelectedMenu} />} />
            <Route
              path="/menu/rechargeSelect"
              element={<RechargeSelect options={options} />}
            />
            <Route
              path="/menu/rechargeSelect/:cryptoId"
              element={<RechargeWrapper />}
            />
            <Route path="/menu/switch-language" element={<SwitchLanguage setSelectedMenu={setSelectedMenu} />} />
            <Route path="/menu/notification" element={<Notification setSelectedMenu={setSelectedMenu} />} />
            <Route path="/menu/about-us" element={<AboutUs setSelectedMenu={setSelectedMenu} />} />
            <Route path="/menu/app-download" element={<AppDownload />} />
            <Route path="/menu/online-service" element={<OnlineService setSelectedMenu={setSelectedMenu} />} />
            {/* <Route
              path="/menu/wallet_connect/:unlockPrice"
              element={<Wallet_Connect/>}
            /> */}
            <Route path="/menu/passport" element={<UpdatePassportInfo setSelectedMenu={setSelectedMenu} />} />
            <Route path="/transfer" element={<TransferAmount />} />
            <Route path="/wallet" element={<FlexibleWallet />} />
          </Routes>
        </Content>
        <Toaster position="top-right" reverseOrder={false} />
      </Layout>
      {actually_paid !== 0 && (
        <div>
          <ConfirmationModal
            message={`$${actually_paid} ${t("has now been deposited into your account.")}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      )}
      {packageprice !== 0 && (
        <div>
          <ConfirmationModal
            message={`${t("You have bought")} $${packageprice} ${t("package successfully!")}`}
            onConfirm={pahandleConfirm}
            onCancel={pahandleCancle}
          />
        </div>
      )}
    </Router>
  );
};

export default App;
