import { SET_EVENTS, ADD_EVENT } from "../actionTypes";

const initialState = {
  events: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS: {
      const { events } = action.payload;
      return {
        ...state,
        events: [...events]
      };
    }
    case ADD_EVENT: {
      const { event } = action.payload;
      return {
        ...state,
        events: [...state.events, event]
      };
    }
    default:
      return state;
  }
}
