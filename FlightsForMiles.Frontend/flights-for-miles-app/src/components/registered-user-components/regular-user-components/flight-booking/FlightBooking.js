import React from "react";
import { Route, Switch } from "react-router";
import FlightsView from "./flights-view/FlightsView";
import OtherOptionsView from "./other-options-view/OtherOptionsView";
import SeatsView from "./seats-view/SeatsView";

function FlightBooking() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/regular/:username/flightBooking"
          component={FlightsView}
        />
        <Route
          exact
          path="/regular/:username/flightBookingSeats"
          component={SeatsView}
        />
        <Route
          exact
          path="/regular/:username/flightBookingOther"
          component={OtherOptionsView}
        />
      </Switch>
    </div>
  );
}

export default FlightBooking;
