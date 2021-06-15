import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { deleteFriend, loadFriends, searchAction } from '../../../../../redux/regular-user/friendship/friendshipAction'

function SearchedFriends() {
    const friendship = useSelector(
        state => state.friendship,
    )
    const dispatch = useDispatch()
    const alert = useAlert()
    const params = useParams()

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
        <div style={{ color: 'white' }}>
            {friendship.searchedFriends.length > 0 ?
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
                        {friendship.searchedFriends.map((friend, index) => {
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
                : <i>--- list of searched friends ---</i>}
        </div>
    )
}

export default SearchedFriends
