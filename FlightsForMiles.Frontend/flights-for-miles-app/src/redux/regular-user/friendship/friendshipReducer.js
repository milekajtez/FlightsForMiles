import { LOADING_FRIENDS, LOADING_MY_REQUESTS, LOADING_REQUESTS_FOR_ME, SEARCH_FRIENDS } from "./friendshipTypes"

const initialState =  {
    myRequests: [],
    requestsToMe: [],
    friends: [],
    searchedFriends: []
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
        case SEARCH_FRIENDS:
            return {
                ...state,
                searchedFriends: action.payload
            }
        default:
            return state
    }
}

export default friendshipReducer