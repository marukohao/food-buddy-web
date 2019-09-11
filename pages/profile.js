import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import UserEventList from "../components/UserEventList";
import { Avatar, Card, Icon, Modal, Input, Form } from "antd";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";

export default function Profile() {
  const [profile, setProfile] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);
    } catch {}
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    e.preventDefault();
    setVisible(false);
    fetch("http://localhost:7777/users" + "/" + profile.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        bio: bio,
        location: location,
        username: name
      })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("data", JSON.stringify(data));
        setProfile(data);
      });
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const handleNameChange = e => {
    setName(e.target.value.replace(/\s+$/, ''));
  };

  const handleLocationChange = e => {
    setLocation(e.target.value.replace(/\s+$/, ''));
  };

  const handleBioChange = e => {
    setBio(e.target.value.replace(/\s+$/, ''));
  };

  if (profile) {
    return (
      <Layouts>
        <div className="container">
          <Card
            style={{
              width: 300,
              margin: "60px 80px",
              opacity: "0.9",
              borderRadius: "3px",
              boxShadow: "2px 2px 5px grey",
              marginLeft: "-40px"
            }}
          >
            <Avatar
              shape="square"
              size={100}
              icon="user"
              src={profile.avatar}
            />
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
            <br />
            <p onClick={showModal} style={{ cursor: "pointer" }}>
              {" "}
              <Icon style={{ margin: "5px" }} type="edit" />
              edit
            </p>
            <Modal
              title="Edit your profile"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Submit"
              closable={false}
            >
              <Input
                type="text"
                style={{ width: "220px", margin: "10px" }}
                placeholder="name"
                name="name"
                id="name"
                onChange={handleNameChange}
              />
              <Input
                type="text"
                style={{ width: "220px", margin: "10px" }}
                placeholder="location"
                name="location"
                id="location"
                onChange={handleLocationChange}
              />
              <Input
                type="text"
                style={{ width: "220px", margin: "10px" }}
                placeholder="bio"
                name="bio"
                id="bio"
                onChange={handleBioChange}
              />
            </Modal>
          </Card>
          <UserEventList />
          <style jsx>{`
            .container {
              width: 100vw;
              height: 100vh;
              background-size: cover;
              background-image: url(https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2442&q=80);
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
  } else {
    return <div></div>;
  }
}
