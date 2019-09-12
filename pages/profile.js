import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import UserEventList from "../components/UserEventList";
import { Avatar, Card, Icon, Modal, Input } from "antd";

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
    setName(e.target.value.replace(/\s+$/, ""));
  };

  const handleLocationChange = e => {
    setLocation(e.target.value.replace(/\s+$/, ""));
  };

  const handleBioChange = e => {
    setBio(e.target.value.replace(/\s+$/, ""));
  };

  if (profile) {
    return (
      <Layouts>
        <div className="container">
          <div className="profile-card-container">
            <Card
              style={{
                opacity: "0.9",
                borderRadius: "3px",
                boxShadow: "2px 2px 5px lightgrey"
              }}
            >
              <div className="profile-wrapper">
                <Avatar
                  shape="square"
                  size={120}
                  icon="user"
                  src={profile.avatar}
                />
                <div className="profile-details">
                  <h4
                    style={{
                      fontSize: "20px"
                    }}
                  >
                    {profile.username}
                  </h4>
                  <Icon style={{ margin: "5px" }} type="environment" />
                  <label>location</label>
                  <h4 style={{ marginLeft: "10px", display: "inline-block" }}>
                    {profile.location}
                  </h4>
                  <br />
                  <Icon style={{ margin: "5px" }} type="idcard" />
                  <label>bio</label>
                  <h4 style={{ marginLeft: "10px", display: "inline-block" }}>
                    {profile.bio}
                  </h4>
                  <p onClick={showModal} style={{ cursor: "pointer" }}>
                    {" "}
                    <Icon style={{ margin: "5px" }} type="edit" />
                    edit
                  </p>
                </div>
              </div>

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
          </div>
          <UserEventList />
          <style jsx>{`
            .container {
              background-size: cover;
              background-image: url(https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2442&q=80);
              display: flex;
              flex-direction: column;
              height: 100vh;
            }
            .profile-wrapper {
              display: flex;
            }
            .profile-card-container {
              width: 100%;
            }
            .profile-details {
              flex: 1;
              padding-left: 15px;
            }
          `}</style>
        </div>
      </Layouts>
    );
  } else {
    return <div></div>;
  }
}
