import React, { useState, useEffect } from "react";
import { Card, Avatar, Popover } from "antd";
import Router from "next/router";

const { Meta } = Card;

export default function ListCard({ event, isHost  }) {
  let json = localStorage.getItem("data");
  let jsonObj = JSON.parse(json);

  const handleClick = (user) => {
    Router.push(`/users/${user.id}`);
  }

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
        <Meta
          avatar={<Avatar src={event.restaurant_image} size="large" />}
          title={event.restaurant_name}
          description={event.host.time + " " + event.host.date}
        />
        {/* <p>{event.host.time + " " + event.host.date}</p> */}
        <p style={{ color: "grey", marginTop: "10px", marginLeft: "60px" }}>
          party number: {event.host.party}
        </p>
        {isHost ? (
          event.joined_users.map(user => (
            <Popover
              style={{ opcity: "0.5" }}
              content={user.username}
              trigger="hover"
              key={user.id}
            >
              <Avatar
                style={{ marginRight: "5px", cursor: "pointer"}}
                size="small"
                icon="user"
                src={user.avatar}
                onClick={() => handleClick(user)}
              />
            </Popover>
          ))
        ) : event.joined ? null : (
          <p style={{color: "orange"}}>join request sent</p>
        )}
        {/* <p>
          {joinUsers.map(user => (
            <Avatar size="small" icon="user" src={user.avatar} key={user} />
          ))}{" "}
        </p> */}
      </Card>
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
