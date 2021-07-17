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