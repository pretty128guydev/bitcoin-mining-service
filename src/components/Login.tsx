// src/components/Login.tsx
import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  setIsAuthenticated: (value: any) => void;
}

const Login: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/login", values)
      .then((response) => {
        message.success("Login successful");
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        message.error("Invalid credentials");
        setLoading(false);
      });
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "auto" }}>
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
        <Button type="link" onClick={() => navigate("/register")}>
          Don't have an account? Register here
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
