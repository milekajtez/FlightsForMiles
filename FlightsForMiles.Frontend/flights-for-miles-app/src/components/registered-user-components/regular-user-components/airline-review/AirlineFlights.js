import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadFlightsForAirline } from "../../../../redux/avio-admin/flight/flightAction";
import Modal from "react-modal";
import FlightMoreInfo from "./FlightMoreInfo";
import SearchForm from "./SearchForm";

function AirlineFlights(props) {
  const [flightInfoIsOpen, setFlightInfo] = useState(false);
  const [currentFlight, setCurrentFlight] = useState({});
  const dispatch = useDispatch();

  const flights = useSelector((state) => state.flight);

  useEffect(() => {
    dispatch(loadFlightsForAirline(props.airlineID));
  }, [dispatch, props.airlineID]);

  const displayMoreInfo = (flight) => {
    setFlightInfo(true);
    setCurrentFlight(flight);
  };

  function makeRating(sumOfAllGrades, numberOfGrades) {
    return numberOfGrades === "0"
      ? 0
      : (parseFloat(sumOfAllGrades) / parseFloat(numberOfGrades)).toFixed(2);
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.flightsIsOpen}
      closeTimeoutMS={500}
      className="new-member-inner-reg"
      onRequestClose={() => props.setFlights(!props.flightsIsOpen)}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <div className="reg-box" style={{ color: "white" }}>
        <h2>AIRLINE FLIGHTS</h2>
        <SearchForm />
        <table className="items-table">
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
            {flights.flightsForAirline.map((flight) => {
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
                      <span
                        className={`fa fa-star${
                          makeRating(
                            flight.sumOfAllGrades,
                            flight.numberOfGrades
                          ) >= 0.5
                            ? " checked"
                            : ""
                        }`}
                      ></span>
                      <span
                        className={`fa fa-star${
                          makeRating(
                            flight.sumOfAllGrades,
                            flight.numberOfGrades
                          ) >= 1.5
                            ? " checked"
                            : ""
                        }`}
                      ></span>
                      <span
                        className={`fa fa-star${
                          makeRating(
                            flight.sumOfAllGrades,
                            flight.numberOfGrades
                          ) >= 2.5
                            ? " checked"
                            : ""
                        }`}
                      ></span>
                      <span
                        className={`fa fa-star${
                          makeRating(
                            flight.sumOfAllGrades,
                            flight.numberOfGrades
                          ) >= 3.5
                            ? " checked"
                            : ""
                        }`}
                      ></span>
                      <span
                        className={`fa fa-star${
                          makeRating(
                            flight.sumOfAllGrades,
                            flight.numberOfGrades
                          ) >= 4.5
                            ? " checked"
                            : ""
                        }`}
                      ></span>
                    </span>
                    <br></br>
                    {makeRating(flight.sumOfAllGrades, flight.numberOfGrades)}
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
      </div>
      <FlightMoreInfo
        flightInfoIsOpen={flightInfoIsOpen}
        setFlightInfo={setFlightInfo}
        currentFlight={currentFlight}
      />
    </Modal>
  );
}

export default AirlineFlights;
