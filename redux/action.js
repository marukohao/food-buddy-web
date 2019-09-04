import { SET_EVENTS, ADD_EVENT } from "./actionTypes";

export const setEvents = events => ({
  type: SET_EVENTS,
  payload: {
    events
  }
});

export const addEvent = event => ({
  type: ADD_EVENT,
  payload: {
    event
  }
});
