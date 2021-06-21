import React from "react";
import FriendsList from "./friends-display/FriendsList";
import SearchForm from "./friends-display/SearchForm";
import FriendshipState from "./friendship-state/FriendshipState";

function RegularUserFriendship() {
  return (
    <div>
      <FriendshipState />
      <SearchForm />
      <FriendsList />
    </div>
  );
}

export default RegularUserFriendship;
