import React, { useState } from "react";
import { Form, Input, Button, Card, message, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/mining.png";
import SignupFrame from "./SignupFrame";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [invitationCode, setInvitationCode] = useState(""); // State for invitation code

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Form Values:", values);

    axios
      .post("http://localhost:5000/api/register", { values, role: "user" })
      .then((response) => {
        message.success("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setLoading(false);
      });
  };

  const handleAdminRegister = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();

      // Only show modal if form is valid
      setModalVisible(true);
    } catch (errorInfo) {
      // Validation failed, display error message
      message.error("Please complete all required fields.");
    }
  };

  const handleModalOk = () => {
    // Close the modal
    setModalVisible(false);

    // Retrieve form values
    const values = form.getFieldsValue(true);
    values.invitationCode = invitationCode; // Add the invitation code to the form values

    setLoading(true);

    axios
      .post("http://localhost:5000/api/register_admin", {
        values,
        role: "admin",
        invitationcode: invitationCode,
      })
      .then((response) => {
        message.success("Registration successful as Administrator");
        navigate("/login");
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setLoading(false);
      });
  };

  const handleModalCancel = () => {
    setModalVisible(false); // Close the modal without proceeding
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <SignupFrame />
      {/* <Card
        title="Register"
        style={{
          maxWidth: 400,
          margin: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
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
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              danger
              onClick={handleAdminRegister}
              loading={loading}
              block
            >
              Register as Administrator
            </Button>
          </Form.Item>
          <Button
            style={{ color: "black" }}
            type="link"
            onClick={() => navigate("/login")}
          >
            Already have an account? Log in here
          </Button>
        </Form>
      </Card> */}

      <Modal
        title="Validation Administrator"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        okText="Submit"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter your invitation code"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Register;
