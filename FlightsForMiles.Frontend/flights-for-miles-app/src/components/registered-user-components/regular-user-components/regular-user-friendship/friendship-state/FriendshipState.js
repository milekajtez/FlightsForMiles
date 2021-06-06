import React from 'react'
import AddFriend from './AddFriend'
import NumberOfFriends from './NumberOfFriends'
import RequestsFromMe from './RequestsFromMe'
import RequestsToMe from './RequestsToMe'

function FriendshipState() {
    return (
        <div style={{backgroundColor: 'rgb(11, 21, 28, 0.75)', width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
            <NumberOfFriends />
            <RequestsFromMe />
            <RequestsToMe />
            <AddFriend />
        </div>
    )
}

export default FriendshipState
