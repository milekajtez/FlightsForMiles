import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteFriendForBooking } from "../../../../../redux/regular-user/friendship/friendshipAction";

function FriendsForBookingList() {
  const dispatch = useDispatch();
  const frienship = useSelector((state) => state.friendship);
  return (
    <div>
      <table className="items-table" style={{ width: "50%", margin: "auto" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Delete chosen friend</th>
          </tr>
        </thead>
        <tbody>
          {frienship.friendsSelectedForBooking.map((friend, index) => {
            return (
              <tr key={index}>
                <td>{friend.username}</td>
                <td>{friend.firstname}</td>
                <td>{friend.lastname}</td>
                <td>{friend.phoneNumber}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteFriendForBooking(friend))}
                  >
                    <i className="fas fa-trash"></i> DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FriendsForBookingList;
