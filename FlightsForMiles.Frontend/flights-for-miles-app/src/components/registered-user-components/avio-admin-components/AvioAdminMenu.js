import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function AvioAdminMenu() {
  const params = useParams();

  return (
    <span style={{ float: "right", marginRight: "5%" }}>
      <div className="dropdown">
        <button className="dropbtn">{params.username}</button>
        <div className="dropdown-content">
          <Link to={`/avio/${params.username}/avioProfile`}>
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

export default AvioAdminMenu;
