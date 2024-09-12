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
        backgroundColor: "#13182f"
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
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
