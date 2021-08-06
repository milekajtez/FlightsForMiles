import bookingService from "../../../services/BookingService";

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