import { FLIGHTS_FOR_AIRLINE_LOADING, FLIGHT_LOADING } from "./flightTypes"

const initialState =  {
    allFlights: [],
    flightsForAirline: []
}

const flightReducer = (state = initialState, action) => {
    switch(action.type){
        case FLIGHT_LOADING:
            return {
                ...state,
                allFlights: action.payload
            }
        case FLIGHTS_FOR_AIRLINE_LOADING:
            return {
                ...state,
                flightsForAirline: action.payload
            }
        default:
            return state
    }
}

export default flightReducer