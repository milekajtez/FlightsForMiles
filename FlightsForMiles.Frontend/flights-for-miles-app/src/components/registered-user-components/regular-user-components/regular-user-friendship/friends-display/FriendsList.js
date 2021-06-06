import React from 'react'

function FriendsList() {

    const deleteSelectedFriend = (friendUsername) => {
        console.log(friendUsername)
    }

    return (
        <div>
            <h3 style={{color: 'white', marginTop: '1%'}}>ALL MY FRIENDS</h3>
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
                    <tr>
                        <td>username 1</td>
                        <td>first name 1</td>
                        <td>last name 1</td>
                        <td>phone number 1</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteSelectedFriend("username 1")}>
                                <i className="fas fa-trash-alt"></i> DELETE
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>username 2</td>
                        <td>first name 2</td>
                        <td>last name 2</td>
                        <td>phone number 2</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteSelectedFriend("username 2")}>
                                <i className="fas fa-trash-alt"></i> DELETE
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default FriendsList
