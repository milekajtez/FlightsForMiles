import {
  ADD_NEW_TIME_VALUE,
  LOAD_BITCOIN_DOLLAR_EXCHAGE,
  LOAD_TICKETS_FOR_ENTERED_AIRLINE,
} from "./dashboardTypes";

const initialState = {
  bitcoinDollarExchange: 0,
  ticketsForEnteredAirline: [],
  timeValue: 0
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BITCOIN_DOLLAR_EXCHAGE:
      return {
        ...state,
        bitcoinDollarExchange: action.payload,
      };
    case LOAD_TICKETS_FOR_ENTERED_AIRLINE:
      return {
        ...state,
        ticketsForEnteredAirline: action.payload,
      };
    case ADD_NEW_TIME_VALUE:
      return {
        ...state,
        timeValue: action.payload,
      }
    default:
      return state;
  }
};

export default dashboardReducer;
