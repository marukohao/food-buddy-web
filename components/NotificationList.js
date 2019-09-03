import React, { useState, useEffect } from "react";
import JoinCard from "./JoinCard";
import Response from "./Response";
import { Card, Avatar, Button } from "antd";
const { Meta } = Card;

export default function NotificationList({responseJoins, requestJoins}) {
  // let RequestJoins = joins.filter(join => join.join.joined == undefined && join.join.declined == undefined)
  let ResponseJoins = responseJoins.filter(join => join.join.joined == true || join.join.declined == true)
  
  requestJoins.map(host => {
    return host.joins
      .filter(join => join.joined == undefined && join.declined == undefined)
      .map(join => (
        <JoinCard
          host={host.host}
          restaurantName={host.restaurant_name}
          join={join}
          key={join.join.id}
        />
      ));
  })
  
  return (
    <div className="container">
      <div className="request-container">
        <h3>Request list:</h3>
        {requestJoins.map(host => {
          const joinedNumber = (host.joins.filter(join => join.joined == true)).length;
          console.log(host.joins.filter(join => join.joined == true), "number");
          return host.joins
            .filter(
              join => join.joined == undefined && join.declined == undefined
            )
            .map(join => (
              <JoinCard
                host={host.host}
                restaurantName={host.restaurant_name}
                join={join}
                joinedNumber={joinedNumber}
                key={join.join.id}
              />
            ));
        })}
      </div>
      <div className="response-container">
        <h3>Response list:</h3>
        {/* {console.log("h", ResponseJoins)} */}
        {ResponseJoins.map(join => (
          <Response
            host={join.host}
            restaurantName={join.restaurant_name}
            join={join.join}
            key={join.join.id}
          />
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: start;
          margin: 20px;
        }
      `}</style>
    </div>
  );
}
