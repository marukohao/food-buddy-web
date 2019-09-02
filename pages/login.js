import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export default function Login() {
  const [failedLogin, setFailedLogin] = useState(false);
  const [user, setUser] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    console.log('hello')
    const username = e.target.username.value;
    const password = e.target.password.value;
    fetch("http://localhost:7777/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message != undefined) {
          setFailedLogin(true);
        } else {
          console.log(data.user.id)
          localStorage.setItem("jwt", data.jwt);
          localStorage.setItem("data", JSON.stringify(data.user));         
          Router.push(`/homepage`);
          setUser(data.user);
        }
      });
  };

  return (
    <div id="login">
      {failedLogin ? (
        <p className="login-error">User name doesn't match your password</p>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            name="username"
            type="text"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Input value="submit" type="submit" />
        </Form.Item>
      </Form>
      <Link href="/signup">
        <a>Create New User</a>
      </Link>
      <style jsx>{`
        #login {
          max-width: 300px;
        }
      `}</style>
    </div>
  );
}
