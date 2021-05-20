import helpService from "../../../services/HelpService"
import { DESCRIPTION_LOADING } from "./helpTypes"

export const loadAppDescriptionAction = (appDescription) => {
    return {
        type: DESCRIPTION_LOADING,
        payload: appDescription
    }
}    

export const loadAppDescription = () => {
    return (dispatch) => {
        helpService.loadAppDescription()
        .then(response => {
            if(response.status === 200){
                dispatch(loadAppDescriptionAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const changeAppDescription = (newAppDescription) => () => 
    new Promise(function(resolve, reject){
        helpService.changeAppDescription(newAppDescription)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })