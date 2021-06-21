import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import AirlineReview from "./airline-review/AirlineReview";
import BookingHistory from "./booking-history/BookingHistory";
import FlightBooking from "./flight-booking/FlightBooking";
import QuickBooking from "./quick-booking/QuickBooking";
import RegularUserFriendship from "./regular-user-friendship/RegularUserFriendship";
import RegularUserProfile from "./regular-user-profile/RegularUserProfile";

function RegularUser() {
  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path="/regular/:username/airlineReview"
          component={AirlineReview}
        />
        <Route
          exact
          path="/regular/:username/bookingHistory"
          component={BookingHistory}
        />
        <Route
          exact
          path="/regular/:username/flightBooking"
          component={FlightBooking}
        />
        <Route
          exact
          path="/regular/:username/quickBooking"
          component={QuickBooking}
        />
        <Route
          exact
          path="/regular/:username/friendship"
          component={RegularUserFriendship}
        />
        <Route
          exact
          path="/regular/:username/regProfile"
          component={RegularUserProfile}
        />
      </Switch>
    </div>
  );
}

export default RegularUser;
