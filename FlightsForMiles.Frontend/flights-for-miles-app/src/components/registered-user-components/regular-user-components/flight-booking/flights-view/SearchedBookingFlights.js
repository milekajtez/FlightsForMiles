import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectFlightForBooking } from "../../../../../redux/avio-admin/flight/flightAction";
import { useHistory, useParams } from "react-router";

function SearchedBookingFlights() {
  const flights = useSelector((state) => state.flight);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const booking = (flightForBooking) => {
    dispatch(selectFlightForBooking(flightForBooking))
    history.push(`/regular/${params.username}/flightBookingSeats`);
  }

  function makeRating(sumOfAllGrades, numberOfGrades) {
    return numberOfGrades === "0"
      ? 0
      : (parseFloat(sumOfAllGrades) /
          parseFloat(numberOfGrades)).toFixed(2);
  }

  return (
    <div>
      {flights.filteredFlights.length > 0 ? (
        <table className="items-table" style={{ boxShadow: "0 0 100px aqua" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start/End time</th>
              <th>Start/End location</th>
              <th>Number of transfers</th>
              <th>Flight time (h)</th>
              <th>Flight length (km)</th>
              <th>Airline name</th>
              <th>Rating</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {flights.filteredFlights.map((flight) => {
              return (
                <tr key={flight.flightID}>
                  <td>{flight.flightID}</td>
                  <td>
                    {flight.startTime}
                    <br></br>
                    {flight.endTime}
                  </td>
                  <td>
                    From: {flight.startLocation}
                    <br></br>To: {flight.endLocation}
                  </td>
                  <td>{flight.numberOfTransfers}</td>
                  <td>{flight.flightTime}</td>
                  <td>{flight.flightLengthKM}</td>
                  <td>{flight.airlineID.split(' ')[2]}</td>
                  <td>
                  <span style={{ color: "white" }}>
                      <span className={`fa fa-star${makeRating(flight.sumOfAllGrades, flight.numberOfGrades) >= 0.5 ? ' checked': ''}`}></span>
                      <span className={`fa fa-star${makeRating(flight.sumOfAllGrades, flight.numberOfGrades) >= 1.5 ? ' checked': ''}`}></span>
                      <span className={`fa fa-star${makeRating(flight.sumOfAllGrades, flight.numberOfGrades) >= 2.5 ? ' checked': ''}`}></span>
                      <span className={`fa fa-star${makeRating(flight.sumOfAllGrades, flight.numberOfGrades) >= 3.5 ? ' checked': ''}`}></span>
                      <span className={`fa fa-star${makeRating(flight.sumOfAllGrades, flight.numberOfGrades) >= 4.5 ? ' checked': ''}`}></span>
                    </span>
                    <br></br>
                    {makeRating(flight.sumOfAllGrades, flight.numberOfGrades)}
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => booking(flight)}
                    >
                      <img src="https://img.icons8.com/dusk/24/000000/airport.png" alt=""/> BOOKING
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div style={{ color: "white" }}>
          <i>--- list of flitered flights ---</i>
        </div>
      )}
    </div>
  );
}

export default SearchedBookingFlights;
