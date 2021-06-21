import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function RegularUserMenu() {
  const params = useParams();
  return (
    <span style={{ float: "right", marginRight: "5%" }}>
      <div className="dropdown">
        <button className="dropbtn">{params.username}</button>
        <div className="dropdown-content">
          <Link to={`/regular/${params.username}/friendship`}>
            <i className="fas fa-user-friends"></i> Friendships
          </Link>
          <Link to={`/regular/${params.username}/regProfile`}>
            <i className="far fa-user-circle"></i> Profile
          </Link>
          <Link to="/">
            <i className="fas fa-sign-out-alt"></i> Log out
          </Link>
        </div>
      </div>
    </span>
  );
}

export default RegularUserMenu;
