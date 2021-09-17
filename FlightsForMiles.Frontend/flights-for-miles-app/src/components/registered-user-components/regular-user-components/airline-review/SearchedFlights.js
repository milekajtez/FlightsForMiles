import React, { useState } from "react";
import { useSelector } from "react-redux";
import FlightMoreInfo from "./FlightMoreInfo";

function SearchedFlights() {
  const [flightInfoIsOpen, setFlightInfo] = useState(false);
  const [currentFlight, setCurrentFlight] = useState({});

  const flights = useSelector((state) => state.flight);

  const displayMoreInfo = (flight) => {
    setFlightInfo(true);
    setCurrentFlight(flight);
  };

  return (
    <>
      {flights.searchedFlights.length > 0 ? (
        <>
          <table
            className="items-table"
            style={{ boxShadow: "0 0 100px aqua" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Start/End time</th>
                <th>Start/End location</th>
                <th>Rating</th>
                <th>More info</th>
              </tr>
            </thead>
            <tbody>
              {flights.searchedFlights.map((flight) => {
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
                    <td>
                      <span style={{ color: "white" }}>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </span>
                      <br></br>
                      {flight.numberOfGrades === "0"
                        ? 0
                        : parseFloat(flight.sumOfAllGrades) /
                          parseFloat(flight.numberOfGrades)}
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => displayMoreInfo(flight)}
                      >
                        <i className="fas fa-info"></i> VIEW
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <FlightMoreInfo
            flightInfoIsOpen={flightInfoIsOpen}
            setFlightInfo={setFlightInfo}
            currentFlight={currentFlight}
          />
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <i>--- list of searched flights ---</i>
        </div>
      )}
    </>
  );
}

export default SearchedFlights;
