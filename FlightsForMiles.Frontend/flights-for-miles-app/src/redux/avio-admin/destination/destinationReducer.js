import { DESTINATIONS_FOR_AIRLINE_LOADING, DESTINATIONS_LOADING } from "./destinationTypes"

const initialState =  {
    allDestinations: [],
    destinationsForAirline: []
}

const destinationReducer = (state = initialState, action) => {
    switch(action.type){
        case DESTINATIONS_LOADING:
            return {
                ...state,
                allDestinations: action.payload
            }
        case DESTINATIONS_FOR_AIRLINE_LOADING:
            return {
                ...state,
                destinationsForAirline: action.payload
            }
        default:
            return state
    }
}

export default destinationReducer