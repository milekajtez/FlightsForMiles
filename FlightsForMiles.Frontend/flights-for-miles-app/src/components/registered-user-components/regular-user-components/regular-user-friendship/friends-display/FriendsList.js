import React from 'react'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { loadFriends, deleteFriend, searchAction } from '../../../../../redux/regular-user/friendship/friendshipAction'

function FriendsList() {
    const dispatch = useDispatch()
    const params = useParams()
    const friendship = useSelector(
        state => state.friendship,
    )
    const alert = useAlert()

    useEffect(() => {
        dispatch(loadFriends(params.username))
    }, [dispatch, params.username])

    const deleteSelectedFriend = (pin) => {
        dispatch(deleteFriend(params.username, pin))
        .then(response => {
            if (response.status === 204) {
                alert.show("Deleting friend successfully.", {
                    type: 'success'
                })

                dispatch(loadFriends(params.username))
                dispatch(searchAction([]))
            }
            else {
                alert.show("Unknown error.", {
                    type: 'error'
                })
            }
        })
        .catch(error => {
            console.log(error)
            if(error.response.data.indexOf("(Deleting unsuccessfully. Friend doesn't exsist.)") !== -1){
                alert.show("Deleting unsuccessfully. Friend doesn't exsist.", {
                    type: 'error'
                })
            }
            else {
                alert.show("Unknown error.", {
                    type: 'error'
                })  
            }
        })
    }

    return (
        <div>
            <h3 style={{ color: 'white', marginTop: '1%' }}>ALL MY FRIENDS</h3>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Phone number</th>
                        <th>Delete friend</th>
                    </tr>
                </thead>
                <tbody>
                    {friendship.friends.map((friend, index) => {
                        return (
                            <tr key={index}>
                                <td>{friend.username}</td>
                                <td>{friend.firstname}</td>
                                <td>{friend.lastname}</td>
                                <td>{friend.phoneNumber}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteSelectedFriend(friend.pin)}>
                                        <i className="fas fa-trash-alt"></i> DELETE
                                </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FriendsList
