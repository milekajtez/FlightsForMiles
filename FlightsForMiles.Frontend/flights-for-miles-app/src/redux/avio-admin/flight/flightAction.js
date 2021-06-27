import flightService from "../../../services/FlightService";
import { FILTER_FLIGHTS, FLIGHTS_FOR_AIRLINE_LOADING, FLIGHT_LOADING, SEARCH_FLIGHTS, SELECT_FLIGHT_FOR_BOOKING } from "./flightTypes";

export const addFlight = (newFlight) => () =>
  new Promise(function (resolve, reject) {
    flightService
      .addFlight(newFlight)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const loadFlightsAction = (flights) => {
  return {
    type: FLIGHT_LOADING,
    payload: flights,
  };
};

export const loadFlights = () => {
  return (dispatch) => {
    flightService
      .loadFlights()
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadFlightsAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteFlight = (flightID) => () =>
  new Promise(function (resolve, reject) {
    flightService
      .deleteFlight(flightID)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const changeFlight = (changedFlight) => () =>
  new Promise(function (resolve, reject) {
    flightService
      .changeFlight(changedFlight)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const loadFlightsForAirlineAction = (flights) => {
  return {
    type: FLIGHTS_FOR_AIRLINE_LOADING,
    payload: flights,
  };
};

export const loadFlightsForAirline = (airlineID) => {
  return (dispatch) => {
    flightService
      .loadFlightsForAirline(airlineID)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadFlightsForAirlineAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const searchAction = (searchedFlights) => {
  return {
    type: SEARCH_FLIGHTS,
    payload: searchedFlights,
  };
};

export const fliterAction = (filteredFlights) => {
  return {
    type: FILTER_FLIGHTS,
    payload: filteredFlights,
  };
};

export const selectFlightForBooking = (selectedFlight) => {
  return {
    type: SELECT_FLIGHT_FOR_BOOKING,
    payload: selectedFlight,
  };
}
