import { FLIGHT_LOADING } from "./flightTypes"

const initialState =  {
    allFlights: []
}

const flightReducer = (state = initialState, action) => {
    switch(action.type){
        case FLIGHT_LOADING:
            return {
                ...state,
                allFlights: action.payload
            }
        default:
            return state
    }
}

export default flightReducer