import React from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { bookingForFriends, bookingWithoutFriends } from "../../../../../redux/regular-user/booking/bookingAction";
import { validateAndMineTransaction } from '../../../../../utils/blockchainUtils';

function FinishOperations() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const ticket = useSelector((state) => state.ticket);
  const flight = useSelector((state) => state.flight);
  const friendship = useSelector((state) => state.friendship);
  const history = useHistory();
  var transactionID = '';

  const bookingFlightWithoutFriends = () => {
    if (ticket.selectedTickets.length !== 1) {
      alert.show(
        "If you want to booking flight only for you, please choose only one ticket.",
        {
          type: "error",
        }
      );
    } 
    else {
      dispatch(bookingWithoutFriends({
        username: params.username,
        flightID: flight.flightForBooking.flightID,
        ticketID: ticket.selectedTickets[0].ticketID
      }))
      .then(response => {
        if (response.status === 200) {
          alert.show("Send request for booking successfully. You will get a message if your request for booking is valid.",
          {
            type: 'success'
          });
          transactionID = response.data;
          validateAndMineTransaction({
            username: params.username,
            flightID: flight.flightForBooking.flightID,
            ticketID: ticket.selectedTickets[0].ticketID,
            transactionID: transactionID,
          })
          transactionID = '';
          history.push(`/regular/${params.username}/airlineReview`);
        }
      })
      .catch(error => {
        console.log(error);
        if (
          error.response.data.indexOf("(Server not found user.)") !== -1
        ) {
          alert.show("Server not found user.", {
            type: "error",
          });
        } else if (
          error.response.data.indexOf("(Server not found flight.)") !== -1
        ) {
          alert.show("Server not found flight.", {
            type: "error",
          });
        }
        else if(error.response.data.indexOf("Server not found ticket.") !== -1) {
          alert.show("Server not found ticket.", {
            type: "error",
          });
        }
        else if(error.response.data.indexOf("User has already send request for booking for this flght and seat.") !== -1) {
          alert.show("User has already send request for booking for this flght and seat.", {
            type: "error",
          });
        }
        else {
          alert.show("Unknown error.", {
            type: "error",
          });
        }
      })
    }
  };
  
  const bookingFlighForFriends = () => {
    if (friendship.friendsSelectedForBooking.length > 0) {
      if (
        ticket.selectedTickets.length !==
        friendship.friendsSelectedForBooking.length
      ) {
        alert.show(
          "Incorrect number of chosen tickets. Number of chosen tickets must me same as number of persons",
          {
            type: "error",
          }
        );
      } else {
        dispatch(bookingForFriends({
          username: params.username,
          friends: friendship.friendsSelectedForBooking,
          tickets: ticket.selectedTickets,
          flightID: flight.flightForBooking.flightID
        }))
        .then(response => {
          if (response.status === 200) {
            alert.show("Send requests for booking successfully. Your friends will get a message if your requests for booking are valid.",
            {
              type: 'success'
            });
            history.push(`/regular/${params.username}/airlineReview`);
          }
        })
        .catch(error => {
          console.log(error);
          if (
            error.response.data.indexOf("(Server not found user.)") !== -1
          ) {
            alert.show("Server not found user.", {
              type: "error",
            });
          } else if (
            error.response.data.indexOf("(Server not found flight.)") !== -1
          ) {
            alert.show("Server not found flight.", {
              type: "error",
            });
          }
          else if(error.response.data.indexOf("Server not found ticket.") !== -1) {
            alert.show("Server not found ticket.", {
              type: "error",
            });
          }
          else if(error.response.data.indexOf("Server not found friend.") !== -1) {
            alert.show("Server not found friend.", {
              type: "error",
            });
          }
          else if(error.response.data.indexOf("User has already send request for booking for this flght and seat.") !== -1) {
            alert.show("User has already send request for booking for this flght and seat.", {
              type: "error",
            });
          }
          else {
            alert.show("Unknown error.", {
              type: "error",
            });
          }
        })
      }
    } else {
      alert.show(
        "You didn't pick any friends",
        {
          type: "error",
        }
      );
    }
  };

  return (
    <div style={{ margin: "8px 0" }}>
      <span className="box">
        <button
          type="submit"
          style={{ backgroundColor: "#141e30" }}
          onClick={() => bookingFlightWithoutFriends()}
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
          onClick={() => bookingFlighForFriends()}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          BOOKING FLIGHT FOR FRIENDS
        </button>
      </span>
    </div>
  );
}

export default FinishOperations;
