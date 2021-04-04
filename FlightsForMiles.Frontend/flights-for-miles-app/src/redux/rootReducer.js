import { combineReducers } from "redux";
import registrationReducer from "./start-page/registration/registrationReducer";
import loginReducer from './start-page/login/loginReducer'

const rootReducer = combineReducers({
    registration: registrationReducer,
    login: loginReducer
})

export default rootReducer