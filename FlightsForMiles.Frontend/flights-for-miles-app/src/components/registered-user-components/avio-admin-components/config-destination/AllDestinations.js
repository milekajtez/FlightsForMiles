import React, { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  loadDestinations,
  deleteDestination,
} from "../../../../redux/avio-admin/destination/destinationAction";
import AddDestination from "./AddDestination";
import ChangeDestination from "./ChangeDestination";

function AllDestinations() {
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [changeIsOpen, setChangeIsOpen] = useState({
    open: false,
    currentDest: {},
  });
  const dispatch = useDispatch();
  const alert = useAlert();

  const destinations = useSelector((state) => state.destination);

  useEffect(() => {
    dispatch(loadDestinations());
  }, [dispatch]);

  const deleteSelectedDestination = (destinationID) => {
    dispatch(deleteDestination(destinationID))
      .then((response) => {
        if (response.status === 204) {
          alert.show("Deleting destination successfully.", {
            type: "success",
          });

          // na kraju ponovo ucitavanje jer se promenilo stanje baze
          dispatch(loadDestinations());
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
            "(Deleting unsuccessfully. Destination with sended id doesn't exsist.)"
          ) !== -1
        ) {
          alert.show(
            "Deleting unsuccessfully. Destination with sended id doesn't exsist.",
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
            <th>Airport ID</th>
            <th>Airport name</th>
            <th>City</th>
            <th>Country</th>
            <th>Airline ID + name</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {destinations.allDestinations.map((destination) => {
            return (
              <tr key={destination.airportID}>
                <td>{destination.airportID}</td>
                <td>{destination.airportName}</td>
                <td>{destination.city}</td>
                <td>{destination.country}</td>
                <td>{destination.airlineID}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      setChangeIsOpen({ open: true, currentDest: destination })
                    }
                  >
                    <i className="fas fa-pencil-alt"></i> CHANGE
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deleteSelectedDestination(destination.airportID)
                    }
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
          ADD NEW DESTINATION
        </button>
      </div>
      <AddDestination addIsOpen={addIsOpen} setAddIsOpen={setAddIsOpen} />
      <ChangeDestination
        changeIsOpen={changeIsOpen}
        setChangeIsOpen={setChangeIsOpen}
      />
    </div>
  );
}

export default AllDestinations;
