import bookingService from "../../../services/BookingService";
import { LOAD_QUICK_BOOKING } from "./bookingTypes";

export const bookingWithoutFriends = (newBooking) => () =>
  new Promise(function (resolve, reject) {
    bookingService
      .bookingWithoutFriends(newBooking)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const bookingForFriends = (newBookings) => () =>
  new Promise(function (resolve, reject) {
    bookingService
      .bookingForFriends(newBookings)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const confirmBooking = (ticketID) => () =>
  new Promise(function (resolve, reject) {
    bookingService
      .confirmBooking(ticketID)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const refuseBooking = (ticketID) => () =>
  new Promise(function (resolve, reject) {
    bookingService
      .refuseBooking(ticketID)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const loadQuickBookingsAction = (quickBookins) => {
  return {
    type: LOAD_QUICK_BOOKING,
    payload: quickBookins,
  };
};
  
export const loadQuickBookings = (username) => {
  return (dispatch) => {
    bookingService
      .loadQuickBookings(username)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadQuickBookingsAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};