import API from './api'

const friendshipService = {
    addFriend: (senderUsername, reciverUsername) => {
        var body = {
            SenderUsername: senderUsername,
            ReceiverUsername: reciverUsername
        }
        
        return API.post(`Friendships`, body)
    },
}

export default friendshipService