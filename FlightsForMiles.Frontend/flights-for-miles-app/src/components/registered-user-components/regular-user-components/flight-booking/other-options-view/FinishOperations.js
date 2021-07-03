import React from "react";

function FinishOperations() {
  return (
    <div style={{margin: '8px 0'}}>
      <span className="box">
        <button
          type="submit"
          style={{ backgroundColor: "#141e30" }}
          /*onClick={() => selectTickets()}*/
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          BOOKING FLIGHT WITHOUT FRIENDS
        </button>
      </span>
      <span className="box">
        <button
          type="submit"
          style={{ backgroundColor: "#141e30" }}
          /*onClick={() => selectTickets()}*/
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          BOOKING FLIGHT WITH FRIENDS
        </button>
      </span>
    </div>
  );
}

export default FinishOperations;
