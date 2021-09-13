import { LOAD_BITCOIN_DOLLAR_EXCHAGE, LOAD_TICKETS_FOR_ENTERED_AIRLINE } from "./dashboardTypes";

const initialState = {
  bitcoinDollarExchange: 0,
  ticketsForEnteredAirline: [],
  /*dollarsInOneDay: [0, 0, 0, 0, 0, 0],
  dollarsInOneWeek: [0, 0, 0, 0, 0, 0, 0],
  dollarsInOneYear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],*/
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
      }
    default:
      return state;
  }
};

export default dashboardReducer;
