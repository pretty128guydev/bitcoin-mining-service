// src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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

const { Content } = Layout;

const App: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const width = useWindowSize() ?? 0;
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
            <Route path="/menu/login-password" element={<LoginPassword />} />
            <Route
              path="/menu/security-password"
              element={<SecurityPassword />}
            />
            <Route path="/menu/record" element={<Record />} />
            <Route path="/menu/switch-language" element={<SwitchLanguage />} />
            <Route path="/menu/notification" element={<Notification />} />
            <Route path="/menu/about-us" element={<AboutUs />} />
            <Route path="/menu/app-download" element={<AppDownload />} />
            <Route path="/menu/online-service" element={<OnlineService />} />
          </Routes>
          <Toaster position="top-center" reverseOrder={false} />
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
