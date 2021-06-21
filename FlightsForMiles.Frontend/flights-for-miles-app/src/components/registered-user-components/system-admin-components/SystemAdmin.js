import React from "react";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import AdminRegistration from "./admin-registration/AdminRegistration";
import AirlineRegistration from "./airline-registration/AirlineRegistration";
import DiscountSettings from "./discount-settings/DiscountSettings";

function SystemAdmin() {
  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path="/system/:username/adminReg"
          component={AdminRegistration}
        />
        <Route
          exact
          path="/system/:username/airlineReg"
          component={AirlineRegistration}
        />
        <Route
          exact
          path="/system/:username/discSettings"
          component={DiscountSettings}
        />
      </Switch>
    </div>
  );
}

export default SystemAdmin;
