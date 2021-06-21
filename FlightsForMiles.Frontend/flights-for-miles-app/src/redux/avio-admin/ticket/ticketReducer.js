import { LOADING_TICKETS } from "./ticketTypes";

const initialState = {
  ticketsForOneFlight: [],
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TICKETS:
      return {
        ...state,
        ticketsForOneFlight: action.payload,
      };
    default:
      return state;
  }
};

export default ticketReducer;
