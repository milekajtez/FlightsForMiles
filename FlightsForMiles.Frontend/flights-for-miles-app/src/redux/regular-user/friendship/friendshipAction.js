import friendshipService from "../../../services/FriendshipService";
import {
  ADD_FRIEND_FOR_BOOKING,
  DELETE_FRIEND_FOR_BOOKING,
  LOADING_FRIENDS,
  LOADING_MY_REQUESTS,
  LOADING_REQUESTS_FOR_ME,
  SEARCH_FRIENDS,
} from "./friendshipTypes";

export const addFriend = (senderUsername, reciverUsername) => () =>
  new Promise(function (resolve, reject) {
    friendshipService
      .addFriend(senderUsername, reciverUsername)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const loadRequestsAction = (requests, requestType) => {
  if (requestType === "fromMe") {
    return {
      type: LOADING_MY_REQUESTS,
      payload: requests,
    };
  } else {
    return {
      type: LOADING_REQUESTS_FOR_ME,
      payload: requests,
    };
  }
};

export const loadRequests = (username, requestType) => {
  return (dispatch) => {
    friendshipService
      .loadRequests(username, requestType)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadRequestsAction(response.data, requestType));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const cancelRequest = (username, secondUsername) => () =>
  new Promise(function (resolve, reject) {
    friendshipService
      .cancelRequest(username, secondUsername)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const rejectRequest = (username, secondUsername) => () =>
  new Promise(function (resolve, reject) {
    friendshipService
      .rejectRequest(username, secondUsername)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const acceptRequest = (username, secondUsername) => () =>
  new Promise(function (resolve, reject) {
    friendshipService
      .acceptRequest(username, secondUsername)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const loadFriendsAction = (friends) => {
  return {
    type: LOADING_FRIENDS,
    payload: friends,
  };
};

export const loadFriends = (username) => {
  return (dispatch) => {
    friendshipService
      .loadFriends(username)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadFriendsAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteFriend = (username, pin) => () =>
  new Promise(function (resolve, reject) {
    friendshipService
      .deleteFriend(username, pin)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const searchAction = (searchedFriends) => {
  return {
    type: SEARCH_FRIENDS,
    payload: searchedFriends,
  };
};

export const addFriendForBooking = (friend) => {
  return {
    type: ADD_FRIEND_FOR_BOOKING,
    payload: friend,
  };
};

export const chooseFriendForBooking = (friend) => () =>
  new Promise(function (resolve, reject) {
    friendshipService
      .chooseFriendForBooking(friend)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const deleteFriendForBooking = (friend) => {
  return {
    type: DELETE_FRIEND_FOR_BOOKING,
    payload: friend,
  };
};
