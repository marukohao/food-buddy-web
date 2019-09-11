import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import { Carousel, Icon, Input } from "antd";
import MainpageRestaurants from "../components/MainpageRestaurants";
import MainpageEvents from "../components/MainpageEvents";
import SearchBar from "../components/SearchBar";

const { Search } = Input;

const CarouselTile = ({ url }) => (
  <div
    className="backgroud"
    style={{
      background: `url("${url}")`,
      height: "200px"
    }}
  ></div>
);

export default function Homepage() {
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);
    } catch {}
  }, []);

  if (!profile) {
    return null;
  }

  // const handleSearch = value => {
  //   console.log(value);
  // };

  return (
    <Layouts style={{ fontFamily: `"Gill Sans", sans-serif` }}>
      <h3 style={{ margin: "10px", color: "#5f5d5d", fontSize: "25px" }}>
        Welcome {profile.username}
      </h3>
      <h4 style={{ margin: "10px", color: "grey" }}>
        Your location
        <Icon style={{ margin: "5px" }} type="environment" />
        {profile.location}
      </h4>
      <SearchBar />
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
        <CarouselTile url="https://www.ennisfoodfestival.com/wp-content/uploads/2017/08/Food-Header.jpg" />
        <CarouselTile url="https://eatpolska.com/wp-content/uploads/2017/10/new_fdt_header.jpg" />
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
