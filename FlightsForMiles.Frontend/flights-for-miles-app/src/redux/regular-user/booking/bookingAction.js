import bookingService from "../../../services/BookingService";
import {
  LOAD_ACTIVE_BOOKING,
  LOAD_PREVIOUS_BOOKING,
  LOAD_QUICK_BOOKING,
} from "./bookingTypes";

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

export const loadActiveBookingsAction = (activeBookings) => {
  return {
    type: LOAD_ACTIVE_BOOKING,
    payload: activeBookings,
  };
};

export const loadActiveBookings = (username) => {
  return (dispatch) => {
    bookingService
      .loadActiveBookings(username)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadActiveBookingsAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loadPreviousBookingsAction = (previousBookings) => {
  return {
    type: LOAD_PREVIOUS_BOOKING,
    payload: previousBookings,
  };
};

export const loadPreviousBookings = (username) => {
  return (dispatch) => {
    bookingService
      .loadPreviousBookings(username)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadPreviousBookingsAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const cancelBooking = (priceObj) => () =>
  new Promise(function (resolve, reject) {
    bookingService
      .cancelBooking(priceObj)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const ratingBooking = (flightID, rate) => () =>
  new Promise(function (resolve, reject) {
    bookingService
      .ratingBooking(flightID, rate)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
