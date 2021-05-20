import { USER_PROFILE_LOADING } from "./profileTypes"
import userService from "../../../services/UserService"

export const loadProfileDataAction = (profileData) => {
    return {
        type: USER_PROFILE_LOADING,
        payload: profileData
    }
}    

export const loadProfileData = (username) => {
    return (dispatch) => {
        userService.loadProfileData(username)
        .then(response => {
            if(response.status === 200){
                dispatch(loadProfileDataAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const changeProfileData = (currentUsername, changedProfileData) => () => 
    new Promise(function(resolve, reject){
        userService.changeProfileData(currentUsername, changedProfileData)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })