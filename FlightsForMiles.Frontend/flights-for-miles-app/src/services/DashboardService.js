import API from "./api";

const dashboardService = {
  loadBitcoinDollarExchange: () => {
    return API.get(`Dashboards/LoadBitcoinDollarExchange`);
  },

  loadTicketsForEnteredAirline: (airlineID) => {
    return API.get(`Dashboards/LoadTicketsForEnteredAirline/${airlineID}`);
  }
};

export default dashboardService;
