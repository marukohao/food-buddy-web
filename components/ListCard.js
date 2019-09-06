import React, { useState, useEffect } from "react";
import { Card, Avatar, Button, Popover } from "antd";
import {moment} from "moment";

const { Meta } = Card;

export default function ListCard({ event, isHost }) {
  let json = localStorage.getItem("data");
  let jsonObj = JSON.parse(json);

  return (
    <div>
      <Card
        // extra={<a href="#">More</a>}
        className="card"
        style={{
          width: 320,
          margin: "20px",
          opacity: "0.8",
          boxShadow: "5px 5px 5px grey"
        }}
      >
        <Meta
          // avatar={<Avatar src={event.restaurant.image_url} size="large" />}
          title={event.restaurant_name}
          description={event.host.time + " " + event.host.date}
        />
        <p style={{ color: "grey" }}>party number: {event.host.party}</p>
        {isHost ? (
          event.joined_users.map(user => (
            <Popover
              style={{ opcity: "0.5" }}
              content={user.username}
              trigger="hover"
            >
              <Avatar
                style={{ marginRight: "5px" }}
                size="small"
                icon="user"
                src={user.avatar}
              />
            </Popover>
          ))
        ) : event.joined ? null : (
          <p>join request sent</p>
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
