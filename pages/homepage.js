import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import { Carousel, Icon, Input, Form } from "antd";
import MainpageRestaurants from "../components/MainpageRestaurants"
import MainpageEvents from "../components/MainpageEvents"
import UserEventList from "../components/UserEventList";

export default function Homepage () {
  const [profile, setProfile] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);
    } catch {}
  }, []);

  return (
    <Layouts style={{ fontFamily: `"Gill Sans", sans-serif` }}>
      <h4 style={{ margin: "10px", color: "grey" }}>
        Welcome {profile.username}
      </h4>
      <h4 style={{ margin: "10px", color: "grey" }}>
        Your location
        <Icon style={{ margin: "5px" }} type="environment" />
        {profile.location}
        {/* <Form>
          <Input style={{ width: "100px", height: "25px" }} type="text" />
          <Input
            style={{ width: "100px", height: "25px" }}
            type="submit"
            value="submit"
          />
        </Form> */}
      </h4>
      <Carousel
        style={{
          textAlign: "center",
          height: "200px",
          lineHeight: "200px",
          background: "#364d79",
          overflow: "hidden",
          margin: "20px"
        }}
        autoplay
      >
        <div
          style={{
            backgroundImage: `url("https://www.ennisfoodfestival.com/wp-content/uploads/2017/08/Food-Header.jpg")`
          }}
        >
          <h3
            style={{
              backgroundImage: `url("https://www.ennisfoodfestival.com/wp-content/uploads/2017/08/Food-Header.jpg")`
            }}
          >
            1
          </h3>
        </div>
        <div
          style={{
            backgroundImage: `url("https://eatpolska.com/wp-content/uploads/2017/10/new_fdt_header.jpg")`
          }}
        >
          <h3
            style={{
              backgroundImage: `url("https://eatpolska.com/wp-content/uploads/2017/10/new_fdt_header.jpg")`
            }}
          >
            2
          </h3>
        </div>
      </Carousel>
      <h2 style={{ margin: "20px", marginTop: "50px" }}>
        Popular restaurants in {profile.location}
      </h2>
      <MainpageRestaurants profile={profile} />
      <h2 style={{ margin: "20px" }}>Recently events in {profile.location}</h2>
      <MainpageEvents profile={profile} />
      <style jsx>{``}</style>
    </Layouts>
  );
}





