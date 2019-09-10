import React, { useState } from "react";
import { Calendar, Input, Button, message, Drawer } from "antd";
import UserResultCard from "./UserResultCard"
const USERAPI = "http://localhost:7777/users";
const { Search } = Input;

export default function SearchBar () {
  const [visible, setVisible] = useState(false);
  const [userResult, setUserResult] = useState(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSearch = (value) => {
    const name = value;
    fetch(USERAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      const users = data.filter(user => user.username.includes(value));
      setUserResult(users);
    })
  }

  return (
    <div>
      <p style={{ marginLeft: "10px", cursor: "pointer", textDecoration: "underline"}} onClick={showDrawer}>
        search user?
      </p>
      <Drawer
        width={350}
        placement="right"
        onClose={onClose}
        closable={false}
        visible={visible}
      >
        <Search
          placeholder="input search text"
          onSearch={value => handleSearch(value)}
          style={{ width: 200, marginLeft: 50 }}
        />
        <div>
          {userResult ? (userResult.length == 0 ? <p>no result</p> : userResult.map(user => <UserResultCard user={user} key={user.id}/>)) : null}
        </div>
      </Drawer>
      <style jsx>{``}</style>
    </div>
  );
}
