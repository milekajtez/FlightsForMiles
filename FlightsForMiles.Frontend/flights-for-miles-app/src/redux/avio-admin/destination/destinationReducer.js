import { DESTINATIONS_LOADING } from "./destinationTypes"

const initialState =  {
    allDestinations: []
}

const destinationReducer = (state = initialState, action) => {
    switch(action.type){
        case DESTINATIONS_LOADING:
            return {
                ...state,
                allDestinations: action.payload
            }
        default:
            return state
    }
}

export default destinationReducer