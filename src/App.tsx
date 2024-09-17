// src/App.tsx
import React, { useState } from "react";
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

import "./i18n.ts";
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
    //   mainnetType={cryptoData.mainnetType}
    //   depositAddress={cryptoData.depositAddress}
    //   qrCodeUrl={cryptoData.qrCodeUrl}
    />
  );
};

const App: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const width = useWindowSize() ?? 0;
  const options = [
    { id: "trc20-usdt", label: "TRC20-USDT", icon: "trc20-usdt-icon" },
    { id: "trx", label: "TRX", icon: "trx-icon" },
    { id: "bep20-usdt", label: "BEP20-USDT", icon: "bep20-usdt-icon" },
    { id: "bnb", label: "BNB", icon: "bnb-icon" },
  ];

  function onError(e: WalletError) {
    if (e instanceof WalletNotFoundError) {
      toast.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message);
    } else toast.error(e.message);
  }

  return (
    <WalletProvider onError={onError}>
      <WalletModalProvider>
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
                    isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
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
                <Route
                  path="/menu/login-password"
                  element={<LoginPassword />}
                />
                <Route
                  path="/menu/security-password"
                  element={<SecurityPassword />}
                />
                <Route path="/menu/record" element={<Record />} />
                <Route
                  path="/rechargeSelect"
                  element={<RechargeSelect options={options} />}
                />
                <Route
                  path="/recharge/:cryptoId"
                  element={<RechargeWrapper />}
                />
                <Route
                  path="/menu/switch-language"
                  element={<SwitchLanguage />}
                />
                <Route path="/menu/notification" element={<Notification />} />
                <Route path="/menu/about-us" element={<AboutUs />} />
                <Route path="/menu/app-download" element={<AppDownload />} />
                <Route
                  path="/menu/online-service"
                  element={<OnlineService />}
                />
                <Route path="/tronconnect" element={<TronWalletConnector />} />
              </Routes>
              <Toaster position="top-center" reverseOrder={false} />
            </Content>
          </Layout>
        </Router>
      </WalletModalProvider>
    </WalletProvider>
  );
};

export default App;
