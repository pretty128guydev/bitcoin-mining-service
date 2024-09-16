import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SigninFrame from "./SigninFrame";
import { useTranslation } from "react-i18next";

interface Props {
  setIsAuthenticated: (value: any) => void;
}

const Login: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/login", values)
      .then((response) => {
        message.success(t("Login successful"));
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/");
      })
      .catch((error) => {
        message.error(t("Invalid credentials"));
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        position: "relative",
        zIndex: 2, // Ensure the card is above the background
      }}
    >
      <SigninFrame />
      {/* <Card
        title="Login"
        style={{
          maxWidth: 400,
          margin: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
          borderRadius: "8px", // Optional: Adding some rounding
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow for contrast
        }} // Slight opacity on the form content
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
          <Button
            style={{ color: "black" }}
            type="link"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Register here
          </Button>
        </Form>
      </Card> */}
    </div>
  );
};

export default Login;
