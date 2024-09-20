// src/App.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
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
import { Toaster } from "react-hot-toast";
import InvestPlus from "./components/InvestPlus/InvestPlus";
import FAQ from "./components/FAQ/FAQ";
import LoginPassword from "./components/LoginPassword/LoginPassword";
import SecurityPassword from "./components/SecurityPassword/SecurityPassword";
import Record from "./components/Record/Record";
import SwitchLanguage from "./components/SwitchLanguage/SwitchLanguage";
import AboutUs from "./components/AboutUs/AboutUs";
import Notification from "./components/Notification/Notification";
import AppDownload from "./components/AppDownload/AppDownload";

// import "./i18n.ts";
import OnlineService from "./components/OnlineService/OnlineService";
import RechargeSelect from "./components/RechargeSelect/RechargeSelect";
import Recharge from "./components/RechargeSelect/Recharge/Recharge";
import TronWalletConnector from "./components/tronWallet/tronWalletConnector";

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
import toast from "react-hot-toast";
import Wallet_Connect from "./components/Wallet_Connect/Wallet_Connect";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UpdatePassportInfo from "./components/UpdatePassportInfo/UpdatePassportInfo";
import { io } from "socket.io-client";
import { MyContext } from "./MyContext";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";

const { Content } = Layout;

const RechargeWrapper: React.FC = () => {
  const { cryptoId } = useParams(); // Get the cryptoId from the URL

  // Map cryptoId to corresponding data
  const cryptoDataMap: Record<
    string,
    { mainnetType: string; depositAddress: string; qrCodeUrl: string }
  > = {
    "trc20-usdt": {
      mainnetType: "TRC20-USDT",
      depositAddress: "TR7kbVZnRByZpoMrf4YrLQ4aJi6FQbaZ5c",
      qrCodeUrl: "https://api.kwtvok.cc/static/image/trc20-usdt.jpg",
    },
    trx: {
      mainnetType: "TRX",
      depositAddress: "TMkPZVNRYzpoMrf4YlQaJ56qFQba75pL2d",
      qrCodeUrl: "https://api.kwtvok.cc/static/image/trx.webp",
    },
    "bep20-usdt": {
      mainnetType: "BEP20-USDT",
      depositAddress: "BNQp123BNYPQR4lKqgFZPba75YlQaJfCZ2",
      qrCodeUrl: "https://api.kwtvok.cc/static/image/bep20-usdt.webp",
    },
    bnb: {
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
  const { mybalance, setMybalance } = context; // Safely destructure from context
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [balance, setBalance] = useState<string>("");
  const [actually_paid, setactually_paid] = useState<number>(0);
  const REACT_APP_SOCKET_PORT = process.env.REACT_APP_SOCKET_PORT;

  const socket = io("http://localhost:8000");

  const token = localStorage.getItem("token");

  const handleCancel = () => {
    setModalVisible(false);
    setactually_paid(0);
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
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get-balance/${userId}`)
        .then((response) => {
          console.log(response.data.balance);
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;

      // Listen for balance response
      socket.on("balanceResponse", (balance, actually_paid) => {
        console.log(balance, actually_paid);
        setMybalance(balance);
        if (!actually_paid) {
          setactually_paid(actually_paid);
        }
      });

      // Listen for balance response
      socket.on(
        "unreadMessagesResponse",
        (unread_messages: number, user_id: number) => {
          console.log(user_id, unread_messages);
          if (user_id === Number(userId)) {
            setMyunreadmessages(unread_messages);
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
                  <Dashboard balance={balance} />
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
            <Route path="/menu/register" element={<Register />} />
            <Route path="/menu/investplus" element={<InvestPlus />} />
            <Route path="/menu/faq" element={<FAQ />} />
            <Route path="/menu/login-password" element={<LoginPassword />} />
            <Route
              path="/menu/security-password"
              element={<SecurityPassword />}
            />
            <Route path="/menu/record" element={<Record />} />
            <Route
              path="/rechargeSelect/:amount"
              element={<RechargeSelect options={options} />}
            />
            <Route path="/recharge/:cryptoId" element={<RechargeWrapper />} />
            <Route path="/menu/switch-language" element={<SwitchLanguage />} />
            <Route path="/menu/notification" element={<Notification />} />
            <Route path="/menu/about-us" element={<AboutUs />} />
            <Route path="/menu/app-download" element={<AppDownload />} />
            <Route path="/menu/online-service" element={<OnlineService />} />
            <Route
              path="/menu/wallet_connect/:unlockPrice"
              element={<Wallet_Connect />}
            />
            <Route path="/tronconnect" element={<TronWalletConnector />} />
            <Route path="/menu/passport" element={<UpdatePassportInfo />} />
          </Routes>
          <Toaster position="top-center" reverseOrder={false} />
        </Content>
      </Layout>
      {actually_paid !== 0 && (
        <div>
          <ConfirmationModal
            message={`${actually_paid}$ has now been deposited into your account.`}
            onConfirm={handleCancel}
            onCancel={handleCancel}
          />
        </div>
      )}
    </Router>
  );
};

export default App;
