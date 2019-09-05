import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import UserEventList from "../components/UserEventList";
import { Avatar, Card, Icon } from "antd";

export default function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);
    } catch {}
  }, []);

  return (
    <Layouts>
      <div className="container">
        <Card style={{ width: 300, margin: "20px 20px" }}>
          <Avatar shape="square" size={64} icon="user" src={profile.avatar} />
          {/* <img src={profile.avatar} /> */}
          <br />
          <h4 style={{ marginLeft: "10px", marginTop: "10px" }}>
            {profile.username}
          </h4>
          <br />
          <Icon style={{ margin: "5px" }} type="environment" />
          <label>location</label>
          <h4 style={{ marginLeft: "10px" }}>{profile.location}</h4>
          <br />
          <Icon style={{ margin: "5px" }} type="idcard" />
          <label>bio</label>
          <h4 style={{ marginLeft: "10px" }}>{profile.bio}</h4>
        </Card>
        <UserEventList />
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            margin: 20px;
          }
        `}</style>
      </div>
    </Layouts>
  );
}
