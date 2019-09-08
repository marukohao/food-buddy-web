import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { Form, Icon, Input } from "antd";

export default function Login() {
  const [failedLogin, setFailedLogin] = useState(false);
  const [user, setUser] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
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
        if (data.message != undefined) {
          setFailedLogin(true);
        } else {
          localStorage.setItem("jwt", data.jwt);
          localStorage.setItem("data", JSON.stringify(data.user));
          Router.push(`/homepage`);
        }
      });
  };

  if (typeof localStorage !== "undefined" && localStorage.getItem("data")) {
    Router.push(`/homepage`);
    return <div></div>;
  } else {
    return (
      <div
        className="login"
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1541544741938-0af808871cc0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2698&q=80)"
        }}
      >
        <div
          className="container"
          style={{
            width: "500px",
            padding: "80px",
            background: "#312a2a",
            opacity: "0.8"
          }}
        >
          {failedLogin ? (
            <p style={{ color: "red" }} className="login-error">
              User name doesn't match your password
            </p>
          ) : null}
          <Form onSubmit={handleSubmit}>
            <p style={{ color: "white" }}>Please log in:</p>
            <Form.Item>
              <Input
                autoComplete="off"
                name="username"
                type="text"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                style={{ height: "40px" }}
              />
            </Form.Item>
            <Form.Item>
              <Input
                autoComplete="off"
                name="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                style={{ height: "40px" }}
              />
            </Form.Item>
            <Form.Item>
              <Input
                value="submit"
                type="submit"
                style={{ height: "40px", cursor: "pointer" }}
              />
            </Form.Item>
          </Form>
          <Link href="/signup">
            <a>Create New User</a>
          </Link>
          <style jsx>{`
            .container {
              // top: 40%;
              // left: 40%;
              // max-width: 400px;
            }
            input {
              height: 40px;
              width: 200px;
            }
          `}</style>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   const { user } = state;
//   return { user };
// };

// const mapDispatchToProps = {
//   setUser
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);
