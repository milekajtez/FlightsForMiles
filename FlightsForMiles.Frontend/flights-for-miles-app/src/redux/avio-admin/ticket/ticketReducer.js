import { ADD_SELECTED_TICKETS, LOADING_TICKETS } from "./ticketTypes";

const initialState = {
  ticketsForOneFlight: [],
  selectedTickets: [],
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TICKETS:
      return {
        ...state,
        ticketsForOneFlight: action.payload,
      };
    case ADD_SELECTED_TICKETS:
      return {
        ...state,
        selectedTickets: action.payload,
      };
    default:
      return state;
  }
};

export default ticketReducer;
