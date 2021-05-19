import { combineReducers } from "redux";
import registrationReducer from "./start-page/registration/registrationReducer";
import loginReducer from './start-page/login/loginReducer'
import discountsReducer from "./system-admin/discounts/discountsReducer";
import destinationReducer from './avio-admin/destination/destinationReducer'
import airlineReducer from "./system-admin/airline-reg/airlineRegReducer";

const rootReducer = combineReducers({
    registration: registrationReducer,
    login: loginReducer,
    discount: discountsReducer,
    airline: airlineReducer,
    destination: destinationReducer
})

export default rootReducer