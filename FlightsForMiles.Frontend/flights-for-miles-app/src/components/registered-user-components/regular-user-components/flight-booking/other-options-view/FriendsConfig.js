import React from "react";
import AddFriendsForBookingForm from "./AddFriendsForBookingForm";
import FinishOperations from "./FinishOperations";
import FriendsForBookingList from "./FriendsForBookingList";

function FriendsConfig() {
  return (
    <>
      <div style={{ width: "100%", display: "inline-block" }}>
        <AddFriendsForBookingForm />
        <FriendsForBookingList />
      </div>
      <FinishOperations />
    </>
  );
}

export default FriendsConfig;
