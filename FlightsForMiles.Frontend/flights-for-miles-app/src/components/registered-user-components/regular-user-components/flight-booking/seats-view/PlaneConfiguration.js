import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addSelectedTickets, loadTickets } from "../../../../../redux/avio-admin/ticket/ticketAction";

function PlaneConfiguration(props) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const params = useParams();
  var checkedSeats = [];

  useEffect(() => {
    dispatch(loadTickets(props.flightID));
  }, [dispatch, props.flightID]);

  const ticket = useSelector((state) => state.ticket);

  function makeTextShowUp(ticket) {
    var message = "";
    if(ticket.isQuickBooking === "YES") {
      message = "You can't to select this seats because this seats is currently for quick booking.\n-------------------------\n";
    }
    if(ticket.isPurchased === "YES") {
      message = "You can't to select this seats because this seats is already purchased.\n-------------------------\n";
    }

    return `${message}Ticket number: ${ticket.number}\nTicket price: ${ticket.price} $\nTicket type: ${ticket.type}\nQuick booking: ${ticket.isQuickBooking}`;
  }

  const changeState = (ticketID) => {
    var index = checkedSeats.indexOf(ticketID);
    if (index > -1) {
      checkedSeats.splice(index, 1);
    } else {
      checkedSeats.push(ticketID);
    }
  };

  const selectTickets = () => {
    if (checkedSeats.length > 0) {
      alert.show(
        "Select ticket(s) successfully. You can go to the next step.",
        {
          type: "success",
        }
      );

      var ticketsResult = [];
      for(let i = 0; i< checkedSeats.length; i++) {
        for(let j = 0; j < ticket.ticketsForOneFlight.length; j++){
          if(checkedSeats[i] === ticket.ticketsForOneFlight[j].ticketID){
            ticketsResult.push(ticket.ticketsForOneFlight[j])
          }
        }
      }

      dispatch(addSelectedTickets(ticketsResult));
      checkedSeats = [];
      ticketsResult = [];
      
      history.push(`/regular/${params.username}/flightBookingOther`);
    }
    else {
      alert.show("You would to select one or higher number of tickets", {
        type: "info",
      });
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "white", marginTop: "8px" }}>
        DISPLAY OF AIRCRAFT SEATS
      </h2>
      <h5 style={{ color: "white" }}>Select seat(s)</h5>
      <div className="plane cabin">
        {ticket.ticketsForOneFlight.map((ticket, index) => {
          return (
            <span className="seat" title={makeTextShowUp(ticket)} key={index}>
              <input
                type="checkbox"
                id={ticket.ticketID}
                onChange={() => changeState(ticket.ticketID)}
                disabled={ticket.isPurchased === "YES" || ticket.isQuickBooking === "YES"}
              />
              <label htmlFor={ticket.ticketID}>{ticket.number}</label>
            </span>
          );
        })}
      </div>
      <div className="box">
        <button
          type="submit"
          style={{ backgroundColor: "#141e30" }}
          onClick={() => selectTickets()}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          SELECT
        </button>
      </div>
    </>
  );
}

export default PlaneConfiguration;
