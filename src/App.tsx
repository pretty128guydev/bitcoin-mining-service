// src/App.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  CiOutlined,
  ProfileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './App.css';
import NewsSection from './components/NewsSection';
import PackagesSection from './components/PackagesSection';
import ReferralSection from './components/ReferralSection';
import ProfileSection from './components/ProfileSection';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = React.useState('news');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'news':
        return <NewsSection />;
      case 'packages':
        return <PackagesSection />;
      case 'referral':
        return <ReferralSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <NewsSection />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          defaultSelectedKeys={['news']}
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
        <Header style={{ background: '#fff', textAlign: 'center' }}>
          Bitcoin Mining Dashboard
        </Header>
        <Content style={{ margin: '16px' }}>{renderContent()}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Bitcoin Mining Dashboard ©2024
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
