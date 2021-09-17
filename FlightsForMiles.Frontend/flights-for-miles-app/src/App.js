import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import StartPage from "./components/start-page-components/StartPage";
import RegularUser from "./components/registered-user-components/regular-user-components/RegularUser";
import SystemAdmin from "./components/registered-user-components/system-admin-components/SystemAdmin";
import AvioAdmin from "./components/registered-user-components/avio-admin-components/AvioAdmin";
import ConfirmRegYes from "./components/confirm-pages-component/ConfirmRegYes";
import ConfirmRegNo from "./components/confirm-pages-component/ConfirmRegNo";
import { Provider } from "react-redux";
import store from "./redux/store";
import ConfirmBookingYes from "./components/confirm-pages-component/ConfirmBookingYes";
import ConfirmBookingNo from "./components/confirm-pages-component/ConfirmBookingNo";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route exact path="/:option?" component={StartPage} />
          <Route
            exact
            path="/confirmRegYes/:username?"
            component={ConfirmRegYes}
          />
          <Route exact path="/confirmRegNo" component={ConfirmRegNo} />
          <Route
            exact
            path="/confirmBookingYes/:friendsUsername?/:flightID?/:ticketID?/:transactionID?"
            component={ConfirmBookingYes}
          />
          <Route
            exact
            path="/confirmBookingNo/:ticketID?"
            component={ConfirmBookingNo}
          />
          <Route
            exact
            path="/system/:username/:option"
            component={SystemAdmin}
          />
          <Route exact path="/avio/:username/:option" component={AvioAdmin} />
          <Route
            exact
            path="/regular/:username/:option"
            component={RegularUser}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
