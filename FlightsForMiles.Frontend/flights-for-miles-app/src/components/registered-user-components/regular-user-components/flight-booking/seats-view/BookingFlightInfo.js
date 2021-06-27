import React from "react";
import { useState } from "react";
import FlightMoreInfo from "../../../avio-admin-components/config-flight/FlightMoreInfo";

function BookingFlightInfo(props) {
  const [moreInfoIsOpen, setMoreInfoIsOpen] = useState({
    isOpen: false,
    currentFlight: props.flight,
  });

  return (
    <div>
      <h2 style={{ color: "white", marginTop: "8px" }}>FLIGHT FOR BOOKING</h2>
      <table className="items-table" style={{ boxShadow: "0 0 100px aqua" }}>
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Start location</th>
            <th>End location</th>
            <th>Airline ID + name</th>
            <th>More info</th>
          </tr>
        </thead>
        <tbody>
          <tr key={props.flight.flightID}>
            <td>{props.flight.flightID}</td>
            <td>{props.flight.startTime}</td>
            <td>{props.flight.endTime}</td>
            <td>{props.flight.startLocation}</td>
            <td>{props.flight.endLocation}</td>
            <td>{props.flight.airlineID}</td>
            <td>
              <button
                className="btn btn-info"
                onClick={() =>
                  setMoreInfoIsOpen({
                    isOpen: true,
                    currentFlight: props.flight,
                  })
                }
              >
                <i className="fas fa-info"></i> MORE INFO
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr style={{ backgroundColor: "aqua", margin: "0 5% 0" }}></hr>
      <FlightMoreInfo
        moreInfoIsOpen={moreInfoIsOpen}
        setMoreInfoIsOpen={setMoreInfoIsOpen}
      />
    </div>
  );
}

export default BookingFlightInfo;
