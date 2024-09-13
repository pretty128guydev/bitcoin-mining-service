import React from "react";
import { Card, Form, Input, Button } from "antd";
import Carousel from "./Carousel";
import bitcoin from "../assets/bitcoin.jpg"
import bitcoin2 from "../assets/bitcoin.png"

const ProfileSection: React.FC = () => {
  return (
    <Card title="Your Profile" bordered={false}>
      <Carousel/>
      <Form layout="vertical">
        <Form.Item label="Username">
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item label="Email">
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Change Password">
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Button type="primary">Update Profile</Button>
      </Form>
    </Card>
  );
};

export default ProfileSection;
