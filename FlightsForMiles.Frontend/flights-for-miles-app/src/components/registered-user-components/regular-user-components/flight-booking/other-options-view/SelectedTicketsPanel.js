import React from "react";
import SelectedTicket from "./SelectedTicket";

function SelectedTicketsPanel(props) {
  return (
    <div>
      <h2 style={{color: 'white', marginTop: '8px'}}>SELECTED TICKETS</h2>
      {props.selectedTickets.map((ticket, index) => {
        return <SelectedTicket ticket={ticket} key={index} />;
      })}
      <hr style={{backgroundColor: 'aqua', margin: '0px 5%'}}></hr>
    </div>
  );
}

export default SelectedTicketsPanel;
