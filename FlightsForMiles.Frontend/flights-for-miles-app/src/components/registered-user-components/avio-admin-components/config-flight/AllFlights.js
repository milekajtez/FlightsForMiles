import React, { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  loadFlights,
  deleteFlight,
} from "../../../../redux/avio-admin/flight/flightAction";
import AddFlight from "./AddFlight";
import ChangeFlight from "./ChangeFlight";
import FlightMoreInfo from "./FlightMoreInfo";

function AllFlights() {
  const [moreInfoIsOpen, setMoreInfoIsOpen] = useState({
    isOpen: false,
    currentFlight: {},
  });
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [changeIsOpen, setChangeIsOpen] = useState({
    isOpen: false,
    currentFlight: {},
  });

  const dispatch = useDispatch();
  const alert = useAlert();

  const flights = useSelector((state) => state.flight);

  useEffect(() => {
    dispatch(loadFlights());
  }, [dispatch]);

  const deleteCurrentFlight = (flightID) => {
    dispatch(deleteFlight(flightID))
      .then((response) => {
        if (response.status === 204) {
          alert.show("Deleting flight successfully.", {
            type: "success",
          });

          dispatch(loadFlights());
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
            "(Deleting unsuccessfully. Flight with sended id doesn't exsist.)"
          ) !== -1
        ) {
          alert.show(
            "Deleting unsuccessfully. Flight with sended id doesn't exsist.",
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
  };

  return (
    <div>
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
            <th>Operations</th>
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
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      setChangeIsOpen({ isOpen: true, currentFlight: flight })
                    }
                  >
                    <i className="fas fa-pencil-alt"></i> CHANGE
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCurrentFlight(flight.flightID)}
                  >
                    <i className="fas fa-trash-alt"></i> DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="box">
        <button
          type="submit"
          style={{ backgroundColor: "#141e30" }}
          onClick={() => setAddIsOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          ADD NEW FLIGHT
        </button>
      </div>
      <AddFlight addIsOpen={addIsOpen} setAddIsOpen={setAddIsOpen} />
      <ChangeFlight
        changeIsOpen={changeIsOpen}
        setChangeIsOpen={setChangeIsOpen}
      />
      <FlightMoreInfo
        moreInfoIsOpen={moreInfoIsOpen}
        setMoreInfoIsOpen={setMoreInfoIsOpen}
      />
    </div>
  );
}

export default AllFlights;
