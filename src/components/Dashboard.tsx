import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  ThunderboltOutlined,
  ProfileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import NewsSection from "./NewsSection";
import PackagesSection from "./PackagesSection";
import ReferralSection from "./ReferralSection";
import ProfileSection from "./ProfileSection";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import CustomFooter from "./Footer";
import up_back from "../assets/up_back.jpg";

const { Header, Content, Sider } = Layout;

const SideBar = ({
  isMobile,
  children,
}: {
  isMobile: boolean;
  children: React.ReactNode;
}) => {
  if (isMobile) {
    return (
      <Sider style={{ display: "none" }} collapsed={true} collapsible={false}>
        {children}
      </Sider>
    );
  } else {
    return <Sider collapsible={true}>{children}</Sider>;
  }
};

const Dashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = React.useState("news");
  const navigate = useNavigate();
  const width = useWindowSize() ?? 0;

  const [role, setrole] = useState(localStorage.getItem("role"));
  console.log(role);
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
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {role == "user" && (
        <SideBar isMobile={width < 500}>
          <Menu
            theme="dark"
            defaultSelectedKeys={["news"]}
            mode="inline"
            onSelect={({ key }) => setSelectedMenu(key)}
            selectedKeys={[selectedMenu]}
          >
            <Menu.Item key="news" icon={<ThunderboltOutlined />}>
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
        </SideBar>
      )}
      {role == "admin" && (
        <SideBar isMobile={width < 500}>
          <Menu
            theme="dark"
            defaultSelectedKeys={["news"]}
            mode="inline"
            onSelect={({ key }) => setSelectedMenu(key)}
            selectedKeys={[selectedMenu]}
          >
            <Menu.Item key="about_news" icon={<ThunderboltOutlined />}>
              About Users
            </Menu.Item>
            <Menu.Item key="news" icon={<ThunderboltOutlined />}>
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
        </SideBar>
      )}
      {role == "superadmin" && (
        <SideBar isMobile={width < 500}>
          <Menu
            theme="dark"
            defaultSelectedKeys={["news"]}
            mode="inline"
            onSelect={({ key }) => setSelectedMenu(key)}
            selectedKeys={[selectedMenu]}
          >
            <Menu.Item key="about_news" icon={<ThunderboltOutlined />}>
              About Users
            </Menu.Item>
            <Menu.Item key="about_admins" icon={<ThunderboltOutlined />}>
              About Admins
            </Menu.Item>
          </Menu>
        </SideBar>
      )}
      <Layout
        style={{
          backgroundColor: "#16163d",
          //   backgroundImage: `url(${up_back})`,
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          //   backgroundPosition: "center center",
        }}
      >
        <Header
          style={{
            background: "#001529",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            height: "47px",
          }}
        >
          <div style={{ color: "white" }}>MY MININGS</div>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content >
          {renderContent()}
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>Bitcoin Mining ©2024</Footer> */}
        <CustomFooter
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
