import friendshipService from '../../../services/FriendshipService'
import { LOADING_MY_REQUESTS, LOADING_REQUESTS_FOR_ME } from './friendshipTypes'

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

export const loadRequestsAction = (requests, requestType) => {
    if(requestType === "fromMe"){
        return {
            type: LOADING_MY_REQUESTS,
            payload: requests
        }
    }
    else{
        return {
            type: LOADING_REQUESTS_FOR_ME,
            payload: requests
        }
    }
}

export const loadRequests = (username, requestType) => {
    return (dispatch) => {
        friendshipService.loadRequests(username, requestType)
        .then(response => {
            if(response.status === 200){
                dispatch(loadRequestsAction(response.data, requestType))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const cancelRequest = (username, secondUsername) => () => 
    new Promise(function(resolve, reject){
        friendshipService.cancelRequest(username, secondUsername)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })