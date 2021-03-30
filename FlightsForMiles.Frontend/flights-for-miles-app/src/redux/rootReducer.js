import { combineReducers } from "redux";
import registrationReducer from "./start-page/registration/registrationReducer";

const rootReducer = combineReducers({
    registration: registrationReducer
})

export default rootReducer