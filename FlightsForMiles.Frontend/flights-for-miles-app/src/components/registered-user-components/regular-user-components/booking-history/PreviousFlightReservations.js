import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { loadPreviousBookings, ratingBooking } from "../../../../redux/regular-user/booking/bookingAction";
import { Rating } from 'react-simple-star-rating';

function PreviousFlightReservations(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const [rating, setRating] = useState(props.array);
  
  useEffect(() => {
    dispatch(loadPreviousBookings(params.username));
  }, [dispatch, params.username, props.array]);

  const handleRating = (rate, flightID, index) => {
    let currentRating = rating;
    currentRating[index] = rate;
    setRating(currentRating);
    ratingAction(flightID, rate);
    props.array[index] = rate;
  };

  const ratingAction = (flightID, rate) => {
    dispatch(ratingBooking(flightID, rate))
      .then(response => {
        if (response.status === 204) {
          alert.show("Define flight rating successfully.", {
            type: "success",
          });
          dispatch(loadPreviousBookings(params.username));
        } else {
          alert.show("Unknown error.", {
            type: "error",
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.data.indexOf("(Airline doesn't exsist.)") !== -1) {
          alert.show(
            "Deleting unsuccessfully. Airline doesn't exsist.",
            {
              type: "error",
            }
          );
        } else {
          alert.show("Unknown error.", {
            type: "error",
          });
        }
      })
  }

  return (
    <span>
      <h2 style={{ color: "white", paddingTop: "8px" }}>MY PREVIOUS BOOKINGS</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>Start/End location</th>
            <th>Start/End time</th>
            <th>Ticket number</th>
            <th>Original ticket price</th>
            <th>Discount ticket price</th>
            <th>Rating booking</th>
          </tr>
        </thead>
        <tbody>
          {props.booking.previousBookings.map((previousBooking, index) => {
            return (
              <tr key={index}>
                <td>
                  From: {previousBooking.startLocation}
                  <br></br>To: {previousBooking.endLocation}
                </td>
                <td>
                  {previousBooking.startTime}
                  <br></br>
                  {previousBooking.endTime}
                </td>
                <td>{previousBooking.ticketNumber}</td>
                <td title={`${previousBooking.originalBitcoinPrice} ₿`}>
                  {previousBooking.originalPrice} $
                </td>
                <td title={`${previousBooking.discountBitcoinPrice} ₿`}>
                  {previousBooking.discountPrice} $
                </td>
                <td>
                  <Rating onClick={(rate) => handleRating(rate, previousBooking.flightID, index)} 
                    ratingValue={rating[index]} size={40} fillColor={'aqua'}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </span>
  );
}

export default PreviousFlightReservations;
