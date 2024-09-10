// src/App.tsx
import React from "react";
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

const { Content } = Layout;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(useAuth());

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
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
