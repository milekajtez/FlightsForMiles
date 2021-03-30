import loginService from "../../../services/LoginService"
import { USER_REGISTRATION } from "./registrationTypes"

// videcemo da li treva payload dodati ???
export const userRegistrationAction = () => {
    return {
        type: USER_REGISTRATION
    }
}

export const userRegistration = (newUser) => {
    return (dispatch) => {
        loginService.userRegistration(newUser)
        .then(response => {
            if(response.status === 201){
                console.log(response)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}