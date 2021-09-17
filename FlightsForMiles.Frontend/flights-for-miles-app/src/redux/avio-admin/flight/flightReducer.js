import {
  FILTER_FLIGHTS,
  FLIGHTS_FOR_AIRLINE_LOADING,
  FLIGHT_LOADING,
  SEARCH_FLIGHTS,
  SELECT_FLIGHT_FOR_BOOKING,
} from "./flightTypes";

const initialState = {
  allFlights: [],
  flightsForAirline: [],
  searchedFlights: [],
  filteredFlights: [],
  flightForBooking: {},
};

const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case FLIGHT_LOADING:
      return {
        ...state,
        allFlights: action.payload,
      };
    case FLIGHTS_FOR_AIRLINE_LOADING:
      return {
        ...state,
        flightsForAirline: action.payload,
      };
    case SEARCH_FLIGHTS:
      return {
        ...state,
        searchedFlights: action.payload,
      };
    case FILTER_FLIGHTS:
      return {
        ...state,
        filteredFlights: action.payload,
      };
    case SELECT_FLIGHT_FOR_BOOKING:
      return {
        ...state,
        flightForBooking: action.payload,
      };
    default:
      return state;
  }
};

export default flightReducer;
