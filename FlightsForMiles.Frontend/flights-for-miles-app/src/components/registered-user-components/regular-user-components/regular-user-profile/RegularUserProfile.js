import React from "react";
import ChangePass from "../../avio-admin-components/avio-admin-profile/ChangePass";
import ChangeProfile from "../../avio-admin-components/avio-admin-profile/ChangeProfile";
import DisplayProfile from "../../avio-admin-components/avio-admin-profile/DisplayProfile";
import UserImage from "../../avio-admin-components/avio-admin-profile/UserImage";

function RegularUserProfile() {
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

export default RegularUserProfile;
