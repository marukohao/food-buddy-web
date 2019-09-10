import React, { useState, useEffect } from "react";
import { Card, Avatar, Popover, Button, Popconfirm, Icon, Drawer } from "antd";
import Router from "next/router";
import MessagesContainer from "./MessagesContainer";

const { Meta } = Card;

export default function ListCard({ event, isHost, upcomingHost, reRender, user }) {
  const [visible, setVisible] = useState(false);
  
  let json = localStorage.getItem("data");
  let jsonObj = JSON.parse(json);

  const handleClick = user => {
    Router.push(`/users/${user.id}`);
  };

  const handleCancelClick = () => {
    fetch("http://localhost:7777/hosts" + "/" + event.host.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        cancelled: true
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        reRender();
      });
  };

  const showDrawer = () => {
    setVisible(true)
    };

  const onClose = () => {
    setVisible(false)
    };

  return (
    <div>
      <Card
        className="card"
        style={{
          width: 320,
          margin: "20px",
          opacity: "0.8",
          boxShadow: "2px 2px 5px grey"
        }}
      >
        {event.host.cancelled && isHost ? (
          <p style={{ color: "orange" }}>Cancelled</p>
        ) : null}
        {isHost ? null : event.host.cancelled ? (
          <p style={{ color: "orange" }}>cancelled by host</p>
        ) : event.joined ? null : (
          <p style={{ color: "orange" }}>join request sent</p>
        )}
        <Meta
          avatar={<Avatar src={event.restaurant_image} size="large" />}
          title={event.restaurant_name}
          description={event.host.time + " " + event.host.date}
        />
        {/* <p>{event.host.time + " " + event.host.date}</p> */}
        <p style={{ color: "grey", marginTop: "10px", marginLeft: "60px" }}>
          party number: {event.host.party}
        </p>
        {isHost
          ? event.joined_users.map(user => (
              <Popover
                style={{ opcity: "0.5" }}
                content={user.username}
                trigger="hover"
                key={user.id}
              >
                <Avatar
                  style={{ marginRight: "5px", cursor: "pointer" }}
                  size="small"
                  icon="user"
                  src={user.avatar}
                  onClick={() => handleClick(user)}
                />
              </Popover>
            ))
          : null}
        {upcomingHost && !event.host.cancelled ? (
          <Popconfirm
            title="Are you sure to cancel this event？"
            icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
            onConfirm={handleCancelClick}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginLeft: "200px" }}>cancel</Button>
          </Popconfirm>
        ) : null}
        {user ? null : <p onClick={showDrawer} >leave a message</p>}
      </Card>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
        <MessagesContainer host={event.host}/>
      </Drawer>
      <style>{`
        @media (max-width: 480px) {
          Card {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
}
