import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layouts from "../../components/Layouts";
import OtherUserEventList from "../../components/OtherUserEventList";
import { Avatar, Card, Icon } from "antd";
// import { responsiveArray } from "antd/lib/_util/responsiveObserve";

const USERAPI = "http://localhost:7777/users/";

export default function Users() {
  const [profile, setProfile] = useState("");
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

  if (profile) {
    return (
      <Layouts>
        <div className="container">
          <div className="profile-card-container">
            <Card
              style={{
                opacity: "0.8",
                boxShadow: "2px 2px 5px lightgrey"
              }}
            >
              <div className="profile-wrapper">
                <Avatar
                  shape="square"
                  size={64}
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
                </div>
              </div>
            </Card>
          </div>
          <OtherUserEventList
            hostEvents={hostEvents}
            joinedEvents={joinedEvents}
            user={profile}
          />
          <style jsx>{`
            .container {
              background-size: cover;
              background-image: url(https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2442&q=80);
              display: flex;
              flex-direction: column;
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

            @media (min-width: 480px) {
              .container {
                height: 100%;
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
