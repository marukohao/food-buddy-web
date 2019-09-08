import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layouts from "../../components/Layouts";
import OtherUserEventList from "../../components/OtherUserEventList";
import { Avatar, Card, Icon } from "antd";
// import { responsiveArray } from "antd/lib/_util/responsiveObserve";

const USERAPI = "http://localhost:7777/users/";

export default function Users() {
  const [profile, setProfile] = useState({});
  const [hostEvents, setHostEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!!router.query.id) {
      fetch(USERAPI + `${router.query.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (!data.hosts) {
          } else {
            console.log("joins", data);
            setProfile(data.user);
            setHostEvents(data.hosts);
            const filterJoins = data.joins.filter(
              join => join.declined != true
            );
            setJoinedEvents(filterJoins);
          }
        });
    }
  }, [router]);


  return (
    <Layouts>
      <div className="container">
        <Card
          style={{
            width: 300,
            margin: "60px 20px",
            opacity: "0.8",
            boxShadow: "2px 2px 5px grey",
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
          <br />
        </Card>
        <OtherUserEventList hostEvents={hostEvents} joinedEvents={joinedEvents} user={profile}/>
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
}

