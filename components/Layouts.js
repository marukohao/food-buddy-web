import Nav from "./Nav";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import React, { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
import Link from "next/link";
import { useRouter } from "next/router";
// const { SubMenu } = Menu;

export default function Layouts(props) {
  const [collapsed, setCollapsed] = useState(
    typeof window !== "undefined" && window.innerWidth < 480
  );
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
    <Layout style={{ height: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <h3
          style={{
            color: "white",
            marginTop: "7px",
            padding: "5px",
            textAlign: "center"
          }}
        >
          Share Table
        </h3>
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
                <span>Notifications</span>
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
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Fredericka+the+Great|Hammersmith+One|Josefin+Sans|Luckiest+Guy|Quicksand|Righteous&display=swap');
        @import url('https://fonts.googleapis.com/css?family=Lobster&display=swap');
        body {
            // font-family: 'Josefin Sans', sans-serif;
            // font-family: 'Righteous', cursive;
            // font-family: 'Hammersmith One', sans-serif;
            // font-family: 'Fredericka the Great', cursive;
        }
        h2, h3 {
          font-family: 'Lobster', cursive;
          font-size: 25px;
        }
      `}</style>
    </Layout>
  );
}
