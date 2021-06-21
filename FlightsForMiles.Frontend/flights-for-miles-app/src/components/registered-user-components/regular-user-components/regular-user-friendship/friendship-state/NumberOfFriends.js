import React from "react";
import { useSelector } from "react-redux";

function NumberOfFriends() {
  const friendship = useSelector((state) => state.friendship);

  return (
    <span
      style={{
        color: "white",
        margin: "0.5%",
        verticalAlign: "middle",
        height: "100%",
      }}
    >
      <h5>
        Number of friends:{" "}
        <span style={{ color: "aqua" }}>{friendship.friends.length}</span>
      </h5>
    </span>
  );
}

export default NumberOfFriends;
