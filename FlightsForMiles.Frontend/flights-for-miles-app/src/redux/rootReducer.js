import { combineReducers } from "redux";
import registrationReducer from "./start-page/registration/registrationReducer";
import loginReducer from "./start-page/login/loginReducer";
import discountsReducer from "./system-admin/discounts/discountsReducer";
import destinationReducer from "./avio-admin/destination/destinationReducer";
import airlineReducer from "./system-admin/airline-reg/airlineRegReducer";
import profileReducer from "./avio-admin/profile/profileReducer";
import helpReducer from "./avio-admin/help/helpReducer";
import flightReducer from "./avio-admin/flight/flightReducer";
import ticketReducer from "./avio-admin/ticket/ticketReducer";
import friendshipReducer from "./regular-user/friendship/friendshipReducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  discount: discountsReducer,
  airline: airlineReducer,
  destination: destinationReducer,
  profile: profileReducer,
  help: helpReducer,
  flight: flightReducer,
  ticket: ticketReducer,
  friendship: friendshipReducer,
});

export default rootReducer;
