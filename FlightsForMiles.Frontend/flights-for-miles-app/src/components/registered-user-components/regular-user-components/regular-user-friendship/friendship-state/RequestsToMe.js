import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { loadRequests } from "../../../../../redux/regular-user/friendship/friendshipAction";
import YourRequest from "./YourRequest";

function RequestsToMe() {
  const dispatch = useDispatch();
  const params = useParams();

  const friendship = useSelector((state) => state.friendship);

  useEffect(() => {
    dispatch(loadRequests(params.username, "toMe"));
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
          Requests to me&nbsp;
          <i className="fas fa-user-friends fa-lg" style={{ color: "aqua" }}>
            <sup> {friendship.requestsToMe.length}</sup>
          </i>
        </h5>
        <div
          className="dropdown-menu dropdown-menu-right"
          style={{ minWidth: "500px", backgroundColor: "rgb(177, 214, 244)" }}
          aria-labelledby="contactsDropdown"
        >
          <h6 className="dropdown-header">
            <b>Requests to me:</b>
          </h6>
          {friendship.requestsToMe.map((request, index) => {
            return <YourRequest request={request} key={index} />;
          })}
        </div>
      </li>
    </span>
  );
}

export default RequestsToMe;
