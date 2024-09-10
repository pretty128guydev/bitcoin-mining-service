import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  CiOutlined,
  ProfileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import NewsSection from "./NewsSection";
import PackagesSection from "./PackagesSection";
import ReferralSection from "./ReferralSection";
import ProfileSection from "./ProfileSection";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = React.useState("news");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedMenu) {
      case "news":
        return <NewsSection />;
      case "packages":
        return <PackagesSection />;
      case "referral":
        return <ReferralSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return <NewsSection />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          defaultSelectedKeys={["news"]}
          mode="inline"
          onSelect={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="news" icon={<CiOutlined />}>
            News & Task
          </Menu.Item>
          <Menu.Item key="packages" icon={<SolutionOutlined />}>
            Packages
          </Menu.Item>
          <Menu.Item key="referral" icon={<ProfileOutlined />}>
            Referral
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", textAlign: "center", display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <div>Bitcoin Mining Dashboard</div>
          <Button type="primary" onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "16px" }}>{renderContent()}</Content>
        <Footer style={{ textAlign: "center" }}>
          Bitcoin Mining Dashboard ©2024
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
