import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import Avatar from "../components/Avatar"
import { Form, Icon, Input } from "antd";

export default function Login() {
  const [src, setSrc] = useState("");
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = preview => {
    setPreview(preview);
  };

  const getAvatar = (imageUrl) => {
    // console.log("get", imageUrl)
    setAvatarUrl(imageUrl);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const location = e.target.location.value;
    const bio = e.target.bio.value;
    // const avatar = e.target.avatar.value;
    fetch("http://localhost:7777/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        password: password,
        avatar: avatarUrl,
        location: location,
        bio: bio
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (data.error != undefined) {
          setUserAlreadyExists(true);
        } else {
          localStorage.setItem("jwt", data.jwt);
          localStorage.setItem("data", JSON.stringify(data.user));
          Router.push(`/homepage`);
        }
      });
  };

  return (
    <div
      className="signup-container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80)"
      }}
    >
      <div
        id="signup"
        style={{
          width: "500px",
          padding: "80px",
          background: "#312a2a",
          opacity: "0.6"
        }}
      >
        {userAlreadyExists ? (
          <p style={{ color: "red" }} className="signup-error">
            user name already exist
          </p>
        ) : null}
        <Form
          style={{ color: "white" }}
          id="signup-form"
          onSubmit={handleSubmit}
        >
          <Form.Item>
            <p style={{ color: "white" }}>Create New Account:</p>
            <Input
              autoComplete="off"
              className="input-box"
              type="text"
              name="name"
              placeholder="name"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{ height: "40px" }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              autoComplete="off"
              className="input-box"
              type="password"
              name="password"
              placeholder="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{ height: "40px" }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              autoComplete="off"
              className="input-box"
              type="text"
              name="location"
              placeholder="location"
              prefix={
                <Icon type="environment" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              style={{ height: "40px" }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              autoComplete="off"
              className="input-box"
              type="text"
              name="bio"
              placeholder="bio"
              prefix={
                <Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              style={{ height: "40px" }}
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Avatar getAvatar={getAvatar} />
          </Form.Item>
          <Form.Item>
            <Input
              id="button"
              className="input-box"
              type="submit"
              value="Sign Up"
              style={{ height: "40px", cursor: "pointer" }}
            />
          </Form.Item>
        </Form>

        <Link href="/login">
          <a>back to login?</a>
        </Link>
      </div>
      <style jsx>{`
        .input-box {
          height: 40px;
        }
      `}</style>
    </div>
  );
}
