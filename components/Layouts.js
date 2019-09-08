import Nav from "./Nav";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import React, { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
import Link from "next/link";
import { useRouter } from "next/router";
// const { SubMenu } = Menu;

export default function Layouts(props) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("data");
    router.push("/login");
  };

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  
  const selectKey = [router.pathname];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={selectKey} mode="inline">
          <Menu.Item key="/homepage">
            <Link href="/homepage">
              <a>
                <Icon type="home" />
                <span>Homepage</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link href="/profile">
              <a>
                <Icon type="user" />
                <span>Profile</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/restaurants">
            <Link href="/restaurants">
              <a>
                <Icon type="shop" />
                <span>Restaurants</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/notification">
            <Link href="/notification">
              <a>
                <Icon type="message" />
                <span>Notification</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/logout" onClick={handleClick}>
            <Icon type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ background: "white", padding: 0 }} /> */}
        <Content style={{}}>
          {props.children}
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
}
