import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Input,
  Button,
  Form,
  Comment,
  Tooltip,
  Popover
} from "antd";
import moment from "moment";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export default function MessagesContainer({ host, hosts, joins }) {
  const [profile, setProfile] = useState();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // console.log("host", host);
  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);

      fetch(`http://localhost:7777/getmessages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          hostid: host.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          // console.log("get", data);
          setMessages(data);
        });
    } catch {}
  }, [input]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.input.value);
    const message = e.target.input.value;
    fetch("http://localhost:7777/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        message: message,
        user_name: profile.username,
        host_id: host.id,
        user_avatar: profile.avatar
      })
    })
      .then(resp => resp.json())
      .then(data => {
        setInput("");
        // console.log(data);
      });
    if (hosts) {
      const hostMember = hosts.filter(user => user.id != profile.id);
      hostMember.forEach(user => {
        fetch("http://localhost:7777/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          },
          body: JSON.stringify({
            new: true,
            host_id: host.id,
            user_id: user.id
          })
        })
          .then(resp => resp.json())
          .then(data => console.log(data));
      });
    } else {
      const joinMember = joins.filter(user => user.id != profile.id);
      joinMember.forEach(user => {
        fetch("http://localhost:7777/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          },
          body: JSON.stringify({
            new: true,
            host_id: host.id,
            user_id: user.id
          })
        })
          .then(resp => resp.json())
          .then(data => console.log("create", data));
      });
    }
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <Layout style={{ height: "90vh" }}>
      <Header style={{ backgroundColor: "white" }}>
        <p style={{ marginLeft: "-50px" }}>
          group member:
          {hosts
            ? hosts.map(user => (
                <Popover
                  style={{ opcity: "0.5" }}
                  content={user.username}
                  trigger="hover"
                  key={user.id}
                >
                  <Avatar
                    style={{ margin: "5px" }}
                    size="medium"
                    icon="user"
                    src={user.avatar}
                  />
                </Popover>
              ))
            : joins.map(user => (
                <Popover
                  style={{ opcity: "0.5" }}
                  content={user.username}
                  trigger="hover"
                  key={user.id}
                >
                  <Avatar
                    style={{ margin: "5px" }}
                    size="medium"
                    icon="user"
                    src={user.avatar}
                  />
                </Popover>
              ))}
        </p>
      </Header>
      <Content
        style={{ height: "70vh", backgroundColor: "white", overflow: "auto" }}
      >
        {messages.map(message => {
          return (
            <Comment
              // actions={actions}
              key={message.message.id}
              author={
                <a>
                  {message.message.user_name == profile.username
                    ? message.message.user_name + " (you)"
                    : message.message.user_name}
                </a>
              }
              avatar={
                <Avatar
                  src={message.message.user_avatar}
                  alt={message.message.user_name}
                />
              }
              content={<p>{message.message.message}</p>}
              datetime={
                <Tooltip>
                  {/* {console.log(message.created_at)} */}
                  {/* {console.log(time)} */}
                  <span>{moment(message.created_at).fromNow()}</span>
                </Tooltip>
              }
            />
          );
        })}
      </Content>
      <Footer style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit} style={{}}>
          <Form.Item>
            <Input
              autoComplete="off"
              value={input}
              onChange={handleChange}
              type="text"
              name="input"
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
      </Footer>
      <style>{`
        // @import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');
        
        // Layout {
        //   font-family: 'Righteous', cursive;
        // }
      `}</style>
    </Layout>
  );
}
