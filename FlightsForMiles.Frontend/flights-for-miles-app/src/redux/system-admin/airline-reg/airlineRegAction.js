import airlineService from "../../../services/AirlineService"
import { AIRLINES_LOADING } from './airlineRegTypes'

export const addAirline = (newAirline) => () => 
    new Promise(function(resolve, reject) {
        airlineService.addAirline(newAirline)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const loadAirlinesAction = (airlines) => {
    return {
        type: AIRLINES_LOADING,
        payload: airlines
    }
}
    
export const loadAirlines = () => {
     return (dispatch) => {
        airlineService.loadAirlines()
        .then(response => {
            if(response.status === 200){
                dispatch(loadAirlinesAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const changeAirline = (changedAirline) => () => 
    new Promise(function(resolve, reject){
        airlineService.changeAirline(changedAirline)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })