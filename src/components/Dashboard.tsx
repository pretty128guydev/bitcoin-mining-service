import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Dropdown, Badge, MenuProps } from "antd";
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
import { useTranslation } from "react-i18next";

const { Header, Content, Sider } = Layout;

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

interface MenuItem {
  key: string;
  icon: any;
  label: string;
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
  const { t } = useTranslation();

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
          setunread_messages(response.data.length);
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

  const menuItems = [
    { key: "about_users", icon: <ThunderboltOutlined />, label: t("USERS") },
    { key: "about_admins", icon: <ThunderboltOutlined />, label: t("ADMINS") },
    { key: "news", icon: <ThunderboltOutlined />, label: t("News & Task") },
    { key: "packages", icon: <SolutionOutlined />, label: t("Packages") },
    { key: "referral", icon: <ProfileOutlined />, label: t("Referral") },
    { key: "profile", icon: <UserOutlined />, label: t("Profile") },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "news":
        return <NewsSection />;
      case "packages":
        return <PackagesSection />;
      case "referral":
        return <ReferralSection />;
      case "profile":
        return (
          <ProfileSection
            unread_messages={unread_messages}
            setSelectedMenu={setSelectedMenu}
          />
        );
      case "about_users":
        return <AdminUsersPage />;
      case "about_admins":
        return <AdminsPage />;
      default:
        return <NewsSection />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };
  const getMenuItems = (role: string | null): MenuProps["items"] => {
    switch (role) {
      case "admin":
        return [
          {
            label: t("Users"),
            key: "about_users",
            icon: <ThunderboltOutlined />,
            theme: "dark",
          },
          {
            label: t("News & Task"),
            key: "news",
            icon: <ThunderboltOutlined />,
            theme: "dark",
          },
          {
            label: t("Packages"),
            key: "packages",
            icon: <SolutionOutlined />,
            theme: "dark",
          },
          {
            label: t("Referral"),
            key: "referral",
            icon: <ProfileOutlined />,
            theme: "dark",
          },
          {
            label: t("Profile"),
            key: "profile",
            icon: <UserOutlined />,
            theme: "dark",
          },
        ];
      case "user":
        return [
          {
            label: t("News & Task"),
            key: "news",
            icon: <ThunderboltOutlined />,
            theme: "dark",
          },
          {
            label: t("Packages"),
            key: "packages",
            icon: <SolutionOutlined />,
            theme: "dark",
          },
          {
            label: t("Referral"),
            key: "referral",
            icon: <ProfileOutlined />,
            theme: "dark",
          },
          {
            label: t("Profile"),
            key: "profile",
            icon: <UserOutlined />,
            theme: "dark",
          },
        ];
      case "superadmin":
        return [
          {
            label: t("Users"),
            key: "about_users",
            icon: <ThunderboltOutlined />,
            theme: "dark",
          },
          {
            label: t("Admins"),
            key: "about_admins",
            icon: <ThunderboltOutlined />,
          },
          {
            label: t("News & Task"),
            key: "news",
            icon: <ThunderboltOutlined />,
            theme: "dark",
          },
          {
            label: t("Packages"),
            key: "packages",
            icon: <SolutionOutlined />,
            theme: "dark",
          },
          {
            label: t("Referral"),
            key: "referral",
            icon: <ProfileOutlined />,
            theme: "dark",
          },
          {
            label: t("Profile"),
            key: "profile",
            icon: <UserOutlined />,
            theme: "dark",
          },
        ];
      default:
        return [];
    }
  };

  const mobileMenu = (): MenuProps => {
    return {
      items: getMenuItems(role),
      theme: "dark",
      onClick: (e) => {
        setSelectedMenu(e.key); // Update state or handle menu click
      },
    };
  };

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
              {t("News & Task")}
            </Menu.Item>
            <Menu.Item key="packages" icon={<SolutionOutlined />}>
              {t("Packages")}
            </Menu.Item>
            <Menu.Item key="referral" icon={<ProfileOutlined />}>
              {t("Referral")}
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              {t("Profile")}
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
            <Menu.Item key="about_users" icon={<ThunderboltOutlined />}>
              {t("About Users")}
            </Menu.Item>
            <Menu.Item key="news" icon={<ThunderboltOutlined />}>
              {t("News & Task")}
            </Menu.Item>
            <Menu.Item key="packages" icon={<SolutionOutlined />}>
              {t("Packages")}
            </Menu.Item>
            <Menu.Item key="referral" icon={<ProfileOutlined />}>
              {t("Referral")}
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              {t("Profile")}
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
              {t("About Users")}
            </Menu.Item>
            <Menu.Item key="about_admins" icon={<ThunderboltOutlined />}>
              {t("About Admins")}
            </Menu.Item>
            <Menu.Item key="news" icon={<ThunderboltOutlined />}>
              {t("News & Task")}
            </Menu.Item>
            <Menu.Item key="packages" icon={<SolutionOutlined />}>
              {t("Packages")}
            </Menu.Item>
            <Menu.Item key="referral" icon={<ProfileOutlined />}>
              {t("Referral")}
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              {t("Profile")}
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
            {width < 500 && (
              <Dropdown menu={mobileMenu()} trigger={["click"]}>
                <Button
                  type="primary"
                  style={{ background: "#0b2f51", width: "70px" }}
                >
                  {t("Menu")}
                </Button>
              </Dropdown>
            )}
            <Button
              type="primary"
              danger
              onClick={handleLogout}
              style={{
                marginLeft: "10px",
                background: "#cf313177",
                width: "70px",
              }}
            >
              {t("Logout")}
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
