import React, { useState, useEffect } from "react";
import { Avatar, Card, Icon, Modal, Input, Form } from "antd";
import Router from "next/router";

export default function UserResultCard({ user }) {

  const handleClick = () => {
    Router.push(`/users/${user.id}`);
  }
  return (
    <div
      style={{
        width: 250,
        height: 100,
        margin: "40px 20px",
        opacity: "0.8",
        boxShadow: "2px 2px 5px lightgrey",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        cursor: "pointer"
      }}
      onClick={handleClick}
    >
      <Avatar shape="square" size={50} icon="user" src={user.avatar} />
      <h4>{user.username}</h4>
      <h4>{user.location}</h4>
    </div>
  );
}
