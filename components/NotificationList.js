import React, { useState, useEffect } from "react";
import JoinCard from "./JoinCard";
import Response from "./Response";
import { Card } from "antd";
const { Meta } = Card;

export default function NotificationList({responseJoins, requestJoins, reRender}) {
  // let RequestJoins = joins.filter(join => join.join.joined == undefined && join.join.declined == undefined)
  // console.log(responseJoins, requestJoins)
  let ResponseJoins = responseJoins.filter(join => join.join.joined == true || join.join.declined == true)
  
  // requestJoins.map(host => {
  //   return host.joins
  //     .filter(join => join.joined == undefined && join.declined == undefined)
  //     .map(join => (
  //       <JoinCard
  //         host={host.host}
  //         restaurantName={host.restaurant_name}
  //         join={join}
  //         key={join.join.id}
  //       />
  //     ));
  // })
  
  return (
    <div className="container">
      <div className="request-container">
        <h3>Host list:</h3>
        {requestJoins.map(host => {
          const joinedNumber = host.joins.filter(join => join.join.joined == true)
            .length + 1;
          // console.log(host.joins.filter(join => join.join.joined == true).length + 1, "number");
          // console.log("check", host);
          return host.joins
            .filter(
              join =>
                join.join.joined == undefined && join.join.declined == undefined
            )
            .map(join => (
              <JoinCard
                reRender={reRender}
                joinedNumber={joinedNumber}
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
          height: 100vh;
          width: 100vw;
          background-size: cover;
          background-image: url(https://images.unsplash.com/photo-1517856497829-3047e3fffae1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80);
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: start;
          // margin: 20px;
        }
        .request-container {
          margin: 20px;
        }
        .response-container {
          margin: 20px;
        }
        @media (max-width: 480px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
