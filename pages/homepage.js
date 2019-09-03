import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import { Carousel, Icon } from "antd";
import MainpageRestaurants from "../components/MainpageRestaurants"

export default function Homepage () {
  const [profile, setProfile] = useState({});

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
        Your location
        <Icon style={{ margin: "5px" }} type="environment" />
        {profile.location}
      </h4>
      <Carousel
        style={{
          textAlign: "center",
          height: "200px",
          lineHeight: "200px",
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
      <h2 style={{ margin: "20px" }}>
        Popular restaurants in {profile.location}
      </h2>
      <MainpageRestaurants />
      <h2 style={{ margin: "20px" }}>Recently events in {profile.location}</h2>
      <style jsx>{``}</style>
    </Layouts>
  );
}





