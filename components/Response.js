import React, { useState } from "react";
import { Card, Icon, Avatar, Button } from "antd";

const { Meta } = Card;

export default function Response({ join, restaurantName, host }) {
  return (
    <Card
      style={{
        width: 300,
        boxShadow: "2px 2px 5px lightgrey",
        opacity: "0.8",
        margin: "20px 0"
      }}
    >
      {join.joined ? (
        <p style={{ color: "green" }}>Your request has been accepted</p>
      ) : (
        <p style={{ color: "red" }}>Your request has been declined</p>
      )}
      <Meta
        // avatar={<Avatar src={join.user.avatar} />}
        title={restaurantName}
        description={host.time + " " + host.date}
      />

      <style jsx>{`
        img {
          height: 200px;
          width: 280px;
        }
      `}</style>
    </Card>
  );
}
