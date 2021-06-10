import { LOADING_FRIENDS, LOADING_MY_REQUESTS, LOADING_REQUESTS_FOR_ME } from "./friendshipTypes"

const initialState =  {
    myRequests: [],
    requestsToMe: [],
    friends: []
}

const friendshipReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADING_MY_REQUESTS:
            return {
                ...state,
                myRequests: action.payload
            }
        case LOADING_REQUESTS_FOR_ME:
            return {
                ...state,
                requestsToMe: action.payload
            }
        case LOADING_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        default:
            return state
    }
}

export default friendshipReducer