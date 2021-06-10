import API from './api'

const friendshipService = {
    addFriend: (senderUsername, reciverUsername) => {
        var body = {
            SenderUsername: senderUsername,
            ReceiverUsername: reciverUsername
        }
        
        return API.post(`Friendships`, body)
    },

    loadRequests: (username, requestType) => {
        return API.get(`Friendships/LoadRequests/${username}/${requestType}`)
    },

    cancelRequest: (username, secondUsername) => {
        return API.delete(`Friendships/CancelRequest/${username}/${secondUsername}`)
    }
}

export default friendshipService