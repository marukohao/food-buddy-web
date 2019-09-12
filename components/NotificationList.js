import React from "react";
import JoinCard from "./JoinCard";
import Response from "./Response";

export default function NotificationList({
  responseJoins,
  requestJoins,
  reRender
}) {
  const compareUpdatetime = (A, B) => {
    const a = Date.parse(A.join.updated_at);
    const b = Date.parse(B.join.updated_at);
    return b - a;
  };
  const compareHostUpdatetime = (A, B) => {
    const a = Date.parse(A.host.updated_at);
    const b = Date.parse(B.host.updated_at);
    return b - a;
  };
  let ResponseJoins = responseJoins
    .filter(join => join.join.joined == true || join.join.declined == true)
    .sort(compareUpdatetime);

  return (
    <div className="container">
      <div className="request-container">
        <h3>Requests:</h3>
        <div style={{ overflow: "auto", flex: "1" }}>
          {requestJoins.sort(compareHostUpdatetime).map(host => {
            const joinedNumber =
              host.joins.filter(join => join.join.joined == true).length + 1;
            return (
              host.joins
                .sort(compareUpdatetime)
                // .filter(
                //   join =>
                //     join.join.joined == undefined && join.join.declined == undefined
                // )
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
                ))
            );
          })}
        </div>
      </div>
      <div className="response-container">
        <h3>Responses:</h3>
        {/* {console.log("h", ResponseJoins)} */}
        <div style={{ overflow: "auto" }}>
          {ResponseJoins.map(join => (
            <Response
              host={join.host}
              restaurantName={join.restaurant_name}
              join={join.join}
              key={join.join.id}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
          background-size: cover;
          background-image: url(https://images.unsplash.com/photo-1517856497829-3047e3fffae1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80);
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: start;
        }
        .request-container,
        .response-container {
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        h3 {
          color: #a87d59;
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
