import friendshipService from '../../../services/FriendshipService'

export const addFriend = (senderUsername, reciverUsername) => () => 
    new Promise(function(resolve, reject){
        friendshipService.addFriend(senderUsername, reciverUsername)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })