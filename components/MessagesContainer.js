import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Input,
  Button,
  Form,
  Comment,
  Tooltip,
  List
} from "antd";
import moment from "moment";

export default function MessagesContainer({ host }) {
  const [profile, setProfile] = useState();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  console.log("host", host);
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
          console.log("get", data);
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
        console.log(data);
      });
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div className="message-container">
        {messages.map(message => {
          // const time = message.created_at
          //   .split("T")[0]
          //   .split("-")
          //   .map(num => Number(num));
          return (
            <Comment
              // actions={actions}
              key={message.message.id}
              author={<a>{message.message.user_name}</a>}
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
      </div>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <p style={{ color: "white" }}>Please log in:</p>
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
      <style>{`
        .message-container {
          height: 80vh;
        }
      `}</style>
    </div>
  );
}
