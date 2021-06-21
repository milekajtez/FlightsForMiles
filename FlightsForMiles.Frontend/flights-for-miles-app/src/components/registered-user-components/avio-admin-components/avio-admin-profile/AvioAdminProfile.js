import React from "react";
import ChangePass from "./ChangePass";
import ChangeProfile from "./ChangeProfile";
import DisplayProfile from "./DisplayProfile";
import UserImage from "./UserImage";

function AvioAdminProfile() {
  return (
    <div className="wrapper">
      <div className="profile-card js-profile-card">
        <UserImage />
        <div className="profile-card__cnt js-profile-cnt">
          <DisplayProfile />
          <ChangeProfile />
          <br></br>
          <ChangePass />
        </div>
      </div>
    </div>
  );
}

export default AvioAdminProfile;
