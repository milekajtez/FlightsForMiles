import destinationService from "../../../services/DestinationService"
import { DESTINATIONS_FOR_AIRLINE_LOADING, DESTINATIONS_LOADING } from "./destinationTypes"

export const addDestination = (newDestination) => () => 
    new Promise(function(resolve, reject){
        destinationService.addDestination(newDestination)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const loadDestinationsAction = (destinations) => {
    return {
        type: DESTINATIONS_LOADING,
        payload: destinations
    }
}    

export const loadDestinations = () => {
    return (dispatch) => {
        destinationService.loadDestinations()
        .then(response => {
            if(response.status === 200){
                dispatch(loadDestinationsAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const deleteDestination = (destinationID) => () => 
    new Promise(function(resolve, reject){
        destinationService.deleteDestination(destinationID)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const changeDestination = (changedDestination) => () => 
    new Promise(function(resolve, reject){
        destinationService.changeDestination(changedDestination)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const loadDestinationsForAirlineAction = (destinationsForAirline) => {
    return {
        type: DESTINATIONS_FOR_AIRLINE_LOADING,
        payload: destinationsForAirline
    }
}  

export const loadDestinationsForAirline = (airlineID) => {
    return (dispatch) => {
        destinationService.loadDestinationsForAirline(airlineID)
        .then(response => {
            if(response.status === 200){
                dispatch(loadDestinationsForAirlineAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}