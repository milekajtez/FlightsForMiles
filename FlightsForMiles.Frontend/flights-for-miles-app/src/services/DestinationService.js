import API from "./api";

const destinationService = {
  addDestination: (newDestination) => {
    var body = {
      AirportName: newDestination.airportName,
      City: newDestination.city,
      Country: newDestination.country,
      AirlineID: newDestination.airlineID,
    };

    return API.post(`Destinations`, body);
  },

  loadDestinations: () => {
    return API.get(`Destinations`);
  },

  deleteDestination: (destinationID) => {
    return API.delete(`Destinations/${destinationID}`);
  },

  changeDestination: (changedDestination) => {
    var body = {
      AirportName: changedDestination.airportName,
      City: changedDestination.city,
      Country: changedDestination.country,
      AirlineID: changedDestination.airlineID,
    };

    return API.put(`Destinations/${changedDestination.airportID}`, body);
  },

  loadDestinationsForAirline: (airlineID) => {
    return API.get(`Destinations/LoadDestinationsForAirline/${airlineID}`);
  },
};

export default destinationService;
