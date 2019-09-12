import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { Calendar, Empty } from "antd";
import { connect } from "react-redux";
import { setEvents } from "../redux/action";
const HOSTAPI = "https://share-table-backend.herokuapp.com/hosts";

function HostEvents({ restaurant, events, setEvents }) {
  const [date, setDate] = useState();

  useEffect(() => {
    if (restaurant) {
      fetch(HOSTAPI, {
        method: "GET",
        headers: {
          restaurantid: restaurant.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(res => res.json())
        .then(data => {
          const availableHosts = data.filter(
            host => host.joins.length + 1 < host.host.party
          );
          setEvents(availableHosts);
        });
    }
  }, [restaurant]);

  const handleChange = value => {
    const selectDate = value.format("LL");
    setDate(selectDate);
  };

  let eventsToDisplay = events;
  if (date) {
    eventsToDisplay = events
      .filter(event => event.host.cancelled != true)
      .filter(event => {
        return date == event.host.date;
      });
  }

  return (
    <div className="container">
      <Calendar fullscreen={false} onChange={handleChange} />
      {!!eventsToDisplay ? (
        eventsToDisplay.length == 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Events"
            style={{ margin: "0 0 20px 20px", display: "flex" }}
          />
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
          overflow: auto;
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
