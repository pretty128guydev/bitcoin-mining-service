import React from "react";
import { Card, Form, Input, Button } from "antd";
import MenuPage from "./MenuPage";

interface ProfileSectionProps {
    setSelectedMenu: (data: any) => void;
    unread_messages: string // Define the type of the data you expect
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ setSelectedMenu, unread_messages }) => {
  return (
    <MenuPage unread_messages={unread_messages} setSelectedMenu={setSelectedMenu}/>
    // <Card title="Your Profile" bordered={false}>
    //   <Form layout="vertical">
    //     <Form.Item label="Username">
    //       <Input placeholder="Enter your username" />
    //     </Form.Item>
    //     <Form.Item label="Email">
    //       <Input placeholder="Enter your email" />
    //     </Form.Item>
    //     <Form.Item label="Change Password">
    //       <Input.Password placeholder="Enter new password" />
    //     </Form.Item>
    //     <Button type="primary">Update Profile</Button>
    //   </Form>
    // </Card>
  );
};

export default ProfileSection;
