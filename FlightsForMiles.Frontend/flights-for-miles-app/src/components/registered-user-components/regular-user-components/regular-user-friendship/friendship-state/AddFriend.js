import React from "react";
import { useState } from "react";
import NewFriendForm from "./NewFriendForm";

function AddFriend() {
  const [isOpen, newFriendIsOpen] = useState(false);
  return (
    <span
      style={{
        color: "white",
        margin: "0.5%",
        verticalAlign: "middle",
        height: "100%",
      }}
    >
      <h5 onClick={() => newFriendIsOpen(true)}>
        Send new request{" "}
        <span style={{ color: "aqua" }}>
          <i className="far fa-plus-square"></i>
        </span>
      </h5>
      <NewFriendForm isOpen={isOpen} newFriendIsOpen={newFriendIsOpen} />
    </span>
  );
}

export default AddFriend;
