import { DESCRIPTION_LOADING } from "./helpTypes"

const initialState =  {
    appDescription: {}
}

const helpReducer = (state = initialState, action) => {
    switch(action.type){
        case DESCRIPTION_LOADING:
            return {
                ...state,
                appDescription: action.payload
            }
        default:
            return state
    }
}

export default helpReducer