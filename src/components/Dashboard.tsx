import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Dropdown, Badge } from "antd";
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
import logo from "../assets/logo.svg";
import AdminUsersPage from "./AdminUsersPage";
import AdminsPage from "./AdminsPage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const { Header, Content, Sider } = Layout;

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

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
  const [userId, setUserId] = useState<string>("");
  const [unread_messages, setunread_messages] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      setUserId(decoded.id);
      const fetchUnreadMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/${userId}/unread`
          );
          setunread_messages(response.data.length)
        } catch (error) {
          console.error("Error fetching unread messages:", error);
        }
      };

      fetchUnreadMessages();
    } else {
      console.log("no tokens");
    }
  });

  const [role, setrole] = useState(localStorage.getItem("role"));
  const renderContent = () => {
    switch (selectedMenu) {
      case "news":
        return <NewsSection />;
      case "packages":
        return <PackagesSection />;
      case "referral":
        return <ReferralSection />;
      case "profile":
        return <ProfileSection unread_messages={unread_messages} setSelectedMenu={setSelectedMenu} />;
      case "about_users":
        return <AdminUsersPage />;
      case "about_admins":
        return <AdminsPage />;
      default:
        return <NewsSection />;
    }
  };
  const menuItems = [
    { key: "news", icon: <ThunderboltOutlined />, label: "News & Task" },
    { key: "packages", icon: <SolutionOutlined />, label: "Packages" },
    { key: "referral", icon: <ProfileOutlined />, label: "Referral" },
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };
  const mobileMenu = (
    <Menu
      theme="dark"
      mode="vertical"
      onClick={({ key }) => setSelectedMenu(key)}
      selectedKeys={[selectedMenu]}
      style={{ background: "rgb(19, 24, 47)" }}
    >
      {menuItems.map(({ key, icon, label }) => (
        <Menu.Item
          key={key}
          icon={icon}
          style={{ color: "#ffffff", background: "rgb(19, 24, 47)" }}
        >
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout style={{ backgroundColor: "white", minHeight: "100vh" }}>
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
            <Menu.Item key="about_users" icon={<ThunderboltOutlined />}>
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
          backgroundColor: "rgb(19, 24, 47)",
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
            padding: "0 10px 0px 0px",
            height: "47px",
          }}
        >
          {/* <div style={{ color: "white" }}>MY MININGS</div> */}
          <img src={logo} style={{ width: "150px", height: "110px" }} />
          <div>
            {/* {width < 425 && (
              <Dropdown overlay={mobileMenu} trigger={["click"]}>
                <Button type="primary">Menu</Button>
              </Dropdown>
            )} */}
            <Button
              type="primary"
              danger
              onClick={handleLogout}
              style={{ marginLeft: "10px" }}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content>{renderContent()}</Content>
        {/* <Footer style={{ textAlign: "center" }}>Bitcoin Mining ©2024</Footer> */}
        <CustomFooter
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          unread_messages={unread_messages}
        />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
