import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { Calendar, Empty } from "antd";
import { connect } from "react-redux";
import { setEvents } from "../redux/action";
const HOSTAPI = "http://localhost:7777/hosts";

function HostEvents({ restaurant, events, setEvents }) {
  // const [events, setEvents] = useState([]);
  const [date, setDate] = useState();
  // const [eventsByDate, setEventsByDate] = useState([]);

  useEffect(() => {
    if (restaurant) {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      fetch(HOSTAPI, {
        method: "GET",
        headers: {
          restaurantid: restaurant.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setEvents(data);
          // setEventsByDate([...data]);
        });
    }
  }, [restaurant]);
  console.log("check", events);
  // console.log("restaurant", restaurant);
  const handleChange = value => {
    const selectDate = value.format("LL");
    setDate(selectDate);
    // setEventsByDate([...events]);
  };

  let eventsToDisplay = events;
  if (date) {
    eventsToDisplay = events.filter(event => {
      return date == event.host.date;
    });
  }

  return (
    <div className="container">
      <Calendar fullscreen={false} onChange={handleChange} />
      {!!eventsToDisplay ? (
        eventsToDisplay.length == 0 ? (
          <Empty />
        ) : (
          eventsToDisplay.map(event => (
            <EventCard
              event={event.host}
              eventUser={event.event_user}
              joinUsers={event.join_users}
              key={event.host.id}
            />
          ))
        )
      ) : null}
      <style jsx>{`
        .container {
          height: 100vh;
          width: 420px;
          overflow: scroll;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

const mapStateToProps = ({ events }) => ({
  events: events.events
});

const mapDispatchToProps = {
  setEvents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HostEvents);
