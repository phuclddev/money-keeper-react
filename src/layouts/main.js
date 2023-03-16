import { Link, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import React, { useEffect } from "react";
import { useState } from 'react';
import { connect } from "react-redux";
import { fetchUserSuccess, fetchUserError } from "../modules/reducer";
import { getUser } from '../api';
import { useDispatch } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme, Button, Popover, Avatar } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

const MainLayout = ({
  currentUser,
  error,
  children
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUser().then(function (res) {
      if (res.status == 'successful') {
        dispatch(fetchUserSuccess(res.payload))
      } else if (res.status == 'fail') {
        dispatch(fetchUserError(res))
      }

    })

  }, []);
  const location = useLocation();
  const paths = window.location.pathname.split('/').filter((path) => path !== '');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
  };

  const content = (
    <div>
      <Button type="text" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </div>
  );
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key="/home" icon={<UserOutlined />}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="/account" icon={<VideoCameraOutlined />}>
        <Link to="/account">Account</Link>
      </Menu.Item>
      <Menu.Item key="/transaction" icon={<UploadOutlined />}>
        <Link to="/transaction">Transaction</Link>
      </Menu.Item>
    </Menu>
      </Sider>
      <Layout className="site-layout">

        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div style={{ float: 'right', marginRight: '30px' }}>
            <Popover placement="bottom" title={currentUser?.first_name} content={content}>
              {error ? <span>Login</span> : <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={currentUser?.avatar} style={{ marginRight: 10 }} />
                <span>{currentUser?.first_name}</span>
              </div>
              }
            </Popover>
          </div>
        </Header>

        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {paths.map((path, index) => (
              <Breadcrumb.Item key={index}>
                <Link to={`/${path}`}>{path.toUpperCase()}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 300,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.main.user,
    error: state.main.error,
  };
};

export default connect(mapStateToProps)(MainLayout);