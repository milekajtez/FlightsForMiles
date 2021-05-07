import { combineReducers } from "redux";
import registrationReducer from "./start-page/registration/registrationReducer";
import loginReducer from './start-page/login/loginReducer'
import discountsReducer from "./system-admin/discounts/discountsReducer";

const rootReducer = combineReducers({
    registration: registrationReducer,
    login: loginReducer,
    discount: discountsReducer
})

export default rootReducer