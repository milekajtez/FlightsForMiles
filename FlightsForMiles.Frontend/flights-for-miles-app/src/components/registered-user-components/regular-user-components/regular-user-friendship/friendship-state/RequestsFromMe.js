import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { loadRequests } from "../../../../../redux/regular-user/friendship/friendshipAction";
import MyRequest from "./MyRequest";

function RequestsFromMe() {
  const dispatch = useDispatch();
  const params = useParams();

  const friendship = useSelector((state) => state.friendship);

  useEffect(() => {
    dispatch(loadRequests(params.username, "fromMe"));
  }, [params.username, dispatch]);

  return (
    <span style={{ color: "white", verticalAlign: "middle", height: "100%" }}>
      <li className="nav-item dropdown">
        <h5
          style={{ color: "white" }}
          className="nav-link dropdown-toggle mr-lg-2"
          id="contactsDropdown"
          data-toggle="dropdown"
        >
          My requests&nbsp;
          <i className="fas fa-user-friends fa-lg" style={{ color: "aqua" }}>
            <sup> {friendship.myRequests.length}</sup>
          </i>
        </h5>
        <div
          className="dropdown-menu dropdown-menu-right"
          style={{ minWidth: "500px", backgroundColor: "rgb(177, 214, 244)" }}
          aria-labelledby="contactsDropdown"
        >
          <h6 className="dropdown-header">
            <b>My requests:</b>
          </h6>
          {friendship.myRequests.map((request, index) => {
            return <MyRequest request={request} key={index} />;
          })}
        </div>
      </li>
    </span>
  );
}

export default RequestsFromMe;
