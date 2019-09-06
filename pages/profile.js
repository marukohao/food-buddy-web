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
        <Card
          style={{
            width: 300,
            margin: "60px 20px",
            opacity: "0.8",
            boxShadow: "5px 5px 5px grey",
            marginLeft: "-40px"
          }}
        >
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
            width: 100vw;
            height: 100vh;
            background-size: cover;
            background-image: url(https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&auto=format&fit=crop&w=2678&q=80);
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: start;
            padding-left: -40px;
          }
          @media (max-width: 480px) {
            .container {
              flex-direction: column;
              align-items: center;
            }
          }
        `}</style>
      </div>
    </Layouts>
  );
}
