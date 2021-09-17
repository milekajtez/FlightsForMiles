import API from "./api";

const friendshipService = {
  addFriend: (senderUsername, reciverUsername) => {
    var body = {
      SenderUsername: senderUsername,
      ReceiverUsername: reciverUsername,
    };

    return API.post(`Friendships`, body);
  },

  loadRequests: (username, requestType) => {
    return API.get(`Friendships/LoadRequests/${username}/${requestType}`);
  },

  cancelRequest: (username, secondUsername) => {
    return API.delete(
      `Friendships/CancelRequest/${username}/${secondUsername}`
    );
  },

  rejectRequest: (username, secondUsername) => {
    return API.delete(
      `Friendships/RejectRequest/${username}/${secondUsername}`
    );
  },

  acceptRequest: (username, secondUsername) => {
    return API.get(`Friendships/AcceptRequest/${username}/${secondUsername}`);
  },

  loadFriends: (username) => {
    return API.get(`Friendships/LoadFriends/${username}`);
  },

  deleteFriend: (username, pin) => {
    return API.delete(`Friendships/DeleteFriend/${username}/${pin}`);
  },

  chooseFriendForBooking: (friend) => {
    return API.get(
      `Friendships/ChooseFriendForBooking/${friend.myusername}/${friend.username}/${friend.passport}`
    );
  },
};

export default friendshipService;
