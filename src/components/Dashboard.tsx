import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Button, Dropdown, Badge, MenuProps } from "antd";
import {
  ThunderboltOutlined,
  ProfileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import NewsSection from "./NewsSection";
import PackagesSection from "./PackagesSection";
import ReferralSection from "./ReferralSection";
import ProfileSection from "./ProfileSection";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import CustomFooter from "./Footer";
import logo from "../assets/logo.png";
import AdminUsersPage from "./AdminUsersPage";
import AdminsPage from "./AdminsPage";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import io from "socket.io-client";
import { MyContext } from "../MyContext";
import axios from "axios";
import "./Dashboard.css"

const { Header, Content, Sider } = Layout;

const REACT_APP_BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;
const socket = io(`${REACT_APP_BACKEND_PORT}`, { path: '/socket.io/' });


interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

interface MenuItem {
  key: string;
  icon: any;
  label: string;
}

interface DashboardProps {
  mybalance: number;
}

interface Message {
  messageId: number;
  createdAt: string;
  content: string;
  senderId: number;
  senderFirstName: string;
  senderLastName: string;
  senderEmail: string;
  senderPhoneNumber: string;
}

const token = localStorage.getItem("token");



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

const Dashboard: React.FC<DashboardProps> = ({ }) => {
  const context = useContext(MyContext);
  const [selectedMenu, setSelectedMenu] = React.useState("news");
  const { mybalance, setMybalance } = context; // Safely destructure from context
  const navigate = useNavigate();
  const width = useWindowSize() ?? 0;
  const [userId, setUserId] = useState<string>("");
  const { t } = useTranslation();
  const [error, setError] = useState<string>("");
  const location = useLocation();

  const [role, setrole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      socket.on("updatebalance", (balance, user_id) => {
        if (user_id == Number(userId)) {
          setMybalance(balance);
        }
      });
    } else {
      console.log("no token found");
    }
  }, [])

  const menuItems = [
    { key: "about_users", icon: <FaRegUser />, label: t("USERS") },
    { key: "about_admins", icon: <RiAdminLine />, label: t("ADMINS") },
    { key: "news", icon: <ThunderboltOutlined />, label: t("News & Task") },
    { key: "packages", icon: <SolutionOutlined />, label: t("Packages") },
    { key: "referral", icon: <ProfileOutlined />, label: t("Referral") },
    { key: "profile", icon: <UserOutlined />, label: t("Profile") },
  ];

  useEffect(() => {
    // Check if we came from the OnlineService and adjust the selected menu accordingly
    if (location.state?.fromService) {
      setSelectedMenu("profile"); // Set the menu to "profile" if navigating from service
    }
  }, [location.state]);

  const renderContent = () => {
    switch (selectedMenu) {
      case "news":
        return <NewsSection />;
      case "packages":
        return <PackagesSection mybalance={mybalance} />;
      case "referral":
        return <ReferralSection />;
      case "profile":
        return (
          <ProfileSection
            setSelectedMenu={setSelectedMenu}
            mybalance={mybalance}
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
            icon: <FaRegUser />,
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
          {
            label: t("LogOut"),
            key: "logout",
            icon: <MdOutlineLogout />,
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
          {
            label: t("LogOut"),
            key: "logout",
            icon: <MdOutlineLogout />,
            theme: "dark",
          },
        ];
      case "superadmin":
        return [
          {
            label: t("Users"),
            key: "about_admins",
            icon: <RiAdminLine />,
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
          {
            label: t("Logout"),
            key: "logout",
            icon: <MdOutlineLogout />,
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
        if (e.key === "logout") {
          handleLogout();
        }
      },
    };
  };

  // const test = () => {
  //   axios
  //     .post(
  //       `https://api-sandbox.nowpayments.io/v1/invoice`,
  //       {
  //         price_amount: 10000,
  //         price_currency: "usd",
  //         order_id: "RGDBP-21314",
  //         order_description: "Apple Macbook Pro 2019 x 1",
  //         ipn_callback_url: `${process.env.REACT_APP_BACKEND_PORT}/api/crypto_payment`,
  //         success_url: "https://nowpayments.io",
  //         cancel_url: "https://nowpayments.io",
  //       },
  //       {
  //         headers: {
  //           "x-api-key": "BH3XM7Q-B7R458H-M0899QP-YHHKBZ1", // Replace with your actual API key
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       // window.location.href = response.data.invoice_url;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // const pay = () => {
  //   const invoice_id = 5179197052;
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_PORT}/api/crypto_payment`, {
  //       payment_status: "finished",
  //       invoice_id: 5179197052,
  //       price_amount: 1000,
  //       actually_paid: 1000,
  //     })
  //     .then((response) => {
  //       // window.location.href = response.data.payment_link;
  //       console.log(response.data);
  //     });
  // };
  // const status = () => {
  //   const id = 2;
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get-balance/${id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

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
            <Menu.Item key="about_users" icon={<FaRegUser />}>
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
            <Menu.Item key="about_admins" icon={<RiAdminLine />}>
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
          <img src={logo} style={{ marginLeft: "10px", width: "35px", height: "35px", cursor: "pointer" }} onClick={() => setSelectedMenu("news")} />
          <div>
            <Dropdown menu={mobileMenu()} trigger={["click"]}>
              <Button
                type="primary"
                style={{
                  padding: "5px 10px",
                  justifyContent: "space-between",
                }}
              >
                <FaUserCircle />
                <span>${`${mybalance}`}</span>
              </Button>
            </Dropdown>
            {/* <Button
              type="primary"
              danger
              onClick={test}
              style={{
                marginLeft: "10px",
                background: "#cf313177",
                width: "70px",
              }}
            >
              {t("TEST")}
            </Button> */}
            {/*<Button
              type="primary"
              danger
              onClick={status}
              style={{
                marginLeft: "10px",
                background: "#cf313177",
                width: "70px",
              }}
            >
              {t("STATUS")}
            </Button>
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
            <Button
              type="primary"
              danger
              onClick={pay}
              style={{
                marginLeft: "10px",
                background: "#cf313177",
                width: "70px",
              }}
            >
              {t("pay")}
            </Button> */}
          </div>
        </Header>
        <Content style={{ height: "calc(100vh - 105px)", }}>{renderContent()}</Content>
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
