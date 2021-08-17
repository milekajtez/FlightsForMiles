import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteTicket,
  loadTickets,
} from "../../../../redux/avio-admin/ticket/ticketAction";
import ChangeTicket from "./ChangeTicket";

function Ticket(props) {
  const [changeTicket, setChangeTicket] = useState({
    isOpen: false,
    ticketID: "",
    flightID: "",
  });
  const dispatch = useDispatch();
  const alert = useAlert();
  const tickets = useSelector((state) => state.ticket);

  function ticketIsPurchased(ticketID) {
    const foundTicket = tickets.selectedTickets.find(
      (ticket) => ticket.ticketID === ticketID
    );
    if (foundTicket) {
      if (foundTicket.isPurchased) {
        alert.show(
          "Delete ticket unsuccessfully because ticket is purchased.",
          {
            type: "error",
          }
        );

        return false;
      }

      return true;
    }

    alert.show("Delete ticket unsuccessfully because ticket doesn't exsist.", {
      type: "error",
    });

    return false;
  }

  const deleteCurrentTicket = (ticketID) => {
    if (ticketIsPurchased(ticketID)) {
      dispatch(deleteTicket(ticketID))
        .then((response) => {
          if (response.status === 204) {
            alert.show("Deleting ticket successfully.", {
              type: "success",
            });

            dispatch(loadTickets(props.ticket.flightID));
          } else {
            alert.show("Unknown error.", {
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (
            error.response.data.indexOf(
              "(Deleting unsuccessfully. Ticket with sended id doesn't exsist or ticket is purchased.)"
            ) !== -1
          ) {
            alert.show(
              "Deleting unsuccessfully. Ticket with sended id doesn't exsist or ticket is purchased.",
              {
                type: "error",
              }
            );
          } else {
            alert.show("Unknown error.", {
              type: "error",
            });
          }
        });
    }
  };

  return (
    <div className="ticket-box">
      <div className="ticket">
        <span className="airline">{props.ticket.airline}</span>
        <div className="content">
          <span className="jfk">{props.ticket.startLocation}</span>
          <span className="plane">
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              height="60"
              width="60"
              imageRendering="optimizeQuality"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#222">
                <line
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="30"
                  x1="300"
                  x2="55"
                  y1="390"
                  y2="390"
                />
                <path
                  d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 
                                35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 
                                4-14 9-20 15l74 63z"
                  fill="#222"
                  strokeLinejoin="round"
                  strokeWidth="10"
                />
              </g>
            </svg>
          </span>
          <span className="sfo">{props.ticket.endLocation}</span>
          <div className="sub-content">
            <div style={{ display: "inline-block" }}>
              <span className="item">
                FLIGHT N&deg;
                <br />
                <span>{props.ticket.flightID}</span>
              </span>
            </div>
            &emsp;&emsp;
            <div style={{ display: "inline-block" }}>
              <span className="item">
                TYPE
                <br />
                <span>{props.ticket.type}</span>
              </span>
            </div>
            &emsp;&emsp;
            <div style={{ display: "inline-block" }}>
              <span className="item">
                SEAT
                <br />
                <span>{props.ticket.number}</span>
              </span>
            </div>
            &emsp;&emsp;
            <div style={{ display: "inline-block" }}>
              <span className="item">
                PRICE
                <br />
                <span title={`${props.ticket.bitcoinPrice} ₿`}>{props.ticket.price} $</span>
              </span>
            </div>
            &emsp;&emsp;
            <div style={{ display: "inline-block" }}>
              <span className="item">
                <br />
                TICKET PURCHASE TIME
                <br />
                <span>{props.ticket.timePurchased}</span>
              </span>
            </div>
            &emsp;&emsp;
            <div style={{ display: "inline-block" }}>
              <span className="item">
                <br />
                IS PURCHASED
                <br />
                <span>{props.ticket.isPurchased}</span>
              </span>
            </div>
            &emsp;&emsp;
            <div style={{ display: "inline-block" }}>
              <span className="item">
                <br />
                IS QUICK BOOKING
                <br />
                <span>{props.ticket.isQuickBooking}</span>
              </span>
            </div>
            &emsp;&emsp;
          </div>
          <div className="box" style={{ height: "20%" }}>
            <button
              type="submit"
              style={{ backgroundColor: "#141e30" }}
              onClick={() =>
                setChangeTicket({
                  isOpen: true,
                  ticketID: props.ticket.ticketID,
                  flightID: props.ticket.flightID,
                })
              }
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Change
            </button>
            <button
              type="submit"
              style={{ backgroundColor: "#141e30" }}
              onClick={() => deleteCurrentTicket(props.ticket.ticketID)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Delete
            </button>
          </div>
          <ChangeTicket
            changeTicket={changeTicket}
            setChangeTicket={setChangeTicket}
          />
        </div>
      </div>
    </div>
  );
}

export default Ticket;
