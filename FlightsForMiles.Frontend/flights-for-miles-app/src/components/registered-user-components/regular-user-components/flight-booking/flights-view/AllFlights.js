import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadFlights } from "../../../../../redux/avio-admin/flight/flightAction";
import FlightMoreInfo from "../../../avio-admin-components/config-flight/FlightMoreInfo";

function AllFlights() {
  const [moreInfoIsOpen, setMoreInfoIsOpen] = useState({
    isOpen: false,
    currentFlight: {},
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFlights());
  }, [dispatch]);

  const flights = useSelector((state) => state.flight);
  return (
    <div>
        <hr style={{backgroundColor: "aqua", margin: '0 5% 0'}}></hr>
        <h2 style={{color: 'white', marginTop: '8px'}}>ALL FLIGHTS</h2>
        <table className="items-table">
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
            {flights.allFlights.map((flight) => {
            return (
              <tr key={flight.flightID}>
                <td>{flight.flightID}</td>
                <td>{flight.startTime}</td>
                <td>{flight.endTime}</td>
                <td>{flight.startLocation}</td>
                <td>{flight.endLocation}</td>
                <td>{flight.airlineID}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() =>
                      setMoreInfoIsOpen({ isOpen: true, currentFlight: flight })
                    }
                  >
                    <i className="fas fa-info"></i> MORE INFO
                  </button>
                </td>
              </tr>
            );
          })}
            </tbody>
        </table>
        <FlightMoreInfo
        moreInfoIsOpen={moreInfoIsOpen}
        setMoreInfoIsOpen={setMoreInfoIsOpen}
      />
    </div>
  );
}

export default AllFlights;
