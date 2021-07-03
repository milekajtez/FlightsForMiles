import {
  ADD_FRIEND_FOR_BOOKING,
  DELETE_FRIEND_FOR_BOOKING,
  LOADING_FRIENDS,
  LOADING_MY_REQUESTS,
  LOADING_REQUESTS_FOR_ME,
  SEARCH_FRIENDS,
} from "./friendshipTypes";

const initialState = {
  myRequests: [],
  requestsToMe: [],
  friends: [],
  searchedFriends: [],
  friendsSelectedForBooking: [],
};

const friendshipReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_MY_REQUESTS:
      return {
        ...state,
        myRequests: action.payload,
      };
    case LOADING_REQUESTS_FOR_ME:
      return {
        ...state,
        requestsToMe: action.payload,
      };
    case LOADING_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case SEARCH_FRIENDS:
      return {
        ...state,
        searchedFriends: action.payload,
      };
    case ADD_FRIEND_FOR_BOOKING:
      var exsist = false;
      for (let i = 0; i < state.friendsSelectedForBooking.length; i++) {
        if (action.payload.pin === state.friendsSelectedForBooking[i].pin) {
          exsist = true;
        }
      }

      if (!exsist) {
        state.friendsSelectedForBooking.push(action.payload);
      }

      return {
        ...state,
      };
    case DELETE_FRIEND_FOR_BOOKING:
      var index = state.friendsSelectedForBooking.map(function(e) {return e.pin}).indexOf(action.payload.pin);
      if (index > -1) {
        state.friendsSelectedForBooking.splice(index, 1);
      }

      return {
        ...state,
      };
    default:
      return state;
  }
};

export default friendshipReducer;
