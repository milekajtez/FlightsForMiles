import userService from "../../../services/UserService"
import { USER_REGISTRATION } from "./registrationTypes"

// videcemo da li treva payload dodati ???
export const userRegistrationAction = () => {
    return {
        type: USER_REGISTRATION
    }
}

export const userRegistration = (newUser) => {
    return () => {
        userService.userRegistration(newUser)
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

export const confirmRegistration = (username) => {
    return () => {
        userService.confirmRegistration(username)
        .then(response => {
            if(response.status === 200){
                console.log("Confirm registration successfully")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}