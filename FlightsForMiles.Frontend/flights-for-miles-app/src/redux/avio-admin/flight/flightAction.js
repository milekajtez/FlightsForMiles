import flightService from "../../../services/FlightService"
import { FLIGHT_LOADING } from "./flightTypes"

export const addFlight = (newFlight) => () => 
    new Promise(function(resolve, reject){
        flightService.addFlight(newFlight)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const loadFlightsAction = (flights) => {
    return {
        type: FLIGHT_LOADING,
        payload: flights
    }
}    

export const loadFlights = () => {
    return (dispatch) => {
        flightService.loadFlights()
        .then(response => {
            if(response.status === 200){
                dispatch(loadFlightsAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const deleteFlight = (flightID) => () => 
    new Promise(function(resolve, reject){
        flightService.deleteFlight(flightID)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const changeFlight = (changedFlight) => () => 
    new Promise(function(resolve, reject){
        flightService.changeFlight(changedFlight)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })