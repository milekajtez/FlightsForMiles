import dashboardService from "../../../services/DashboardService";
import {
  LOAD_BITCOIN_DOLLAR_EXCHAGE,
  LOAD_TICKETS_FOR_ENTERED_AIRLINE,
} from "./dashboardTypes";

export const loadBitcoinDollarExchangeAction = (value) => {
  return {
    type: LOAD_BITCOIN_DOLLAR_EXCHAGE,
    payload: value,
  };
};

export const loadBitcoinDollarExchange = () => {
  return (dispatch) => {
    dashboardService
      .loadBitcoinDollarExchange()
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadBitcoinDollarExchangeAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loadTicketsForEnteredAirlineAction = (tickets) => {
  return {
    type: LOAD_TICKETS_FOR_ENTERED_AIRLINE,
    payload: tickets,
  };
};

export const loadTicketsForEnteredAirline = (airlineID) => () => 
new Promise(function (resolve, reject) {
  dashboardService
    .loadTicketsForEnteredAirline(airlineID)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});
