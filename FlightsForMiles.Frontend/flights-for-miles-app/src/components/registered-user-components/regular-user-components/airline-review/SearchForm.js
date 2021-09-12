import React from "react";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from '../../../../redux/avio-admin/flight/flightAction';
import SearchedFlights from "./SearchedFlights";

function SearchForm() {
  const flights = useSelector((state) => state.flight);
  const alert = useAlert();
  const dispatch = useDispatch();

  const startLocationField = useFormField({
    initialValue: "",
  });
  const endLocationField = useFormField({
    initialValue: "",
  });
  

  const searchFlightsForm = useFormWithFields({
    onSubmit: (e) => {
      if (SearchValidation()) {
        let searchedFlights = [];
        for (let i = 0; i < flights.flightsForAirline.length; i++) {
          let searchStartLocation = true;
          let searchEndLocation = true;

          if (startLocationField.value !== "") {
            if (flights.flightsForAirline[i].startLocation === startLocationField.value) {
                searchStartLocation = true;
            } else {
                searchStartLocation = false;
            }
          }

          if (endLocationField.value !== "") {
            if (flights.flightsForAirline[i].endLocation === endLocationField.value) {
                searchEndLocation = true;
            } else {
                searchEndLocation = false;
            }
          }

          

          if (searchStartLocation && searchEndLocation) {
            searchedFlights.push(flights.flightsForAirline[i]);
          }
        }

        dispatch(searchAction(searchedFlights));

        searchFlightsForm.handleReset();
      }

      e.preventDefault();
    },
    fields: [startLocationField, endLocationField],
  });

  function SearchValidation() {
    if (
        startLocationField.value === "" &&
        endLocationField.value === ""
    ) {
      alert.show("You must enter at least one parameter.", {
        type: "info",
      });

      return false;
    }

    return true;
  }
  return (
    <>
      <div
        
        style={{ display: "inline-block", marginTop: "1%", textAlign: 'center', width: '100%' }}
      >
        <h3 className="subtitle">SEARCH FLIGHT</h3>
        <form onSubmit={searchFlightsForm.handleSubmit}>
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="startLocation"
              className="input"
              type="text"
              placeholder=" "
              value={startLocationField.value}
              onChange={startLocationField.handleChange}
            />
            <div className="cut" style={{width: '100px'}}></div>
            <label htmlFor="startLocation" className="placeholder">
              Start location
            </label>
          </span>
          &nbsp;
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="endLocation"
              className="input"
              type="text"
              placeholder=" "
              value={endLocationField.value}
              onChange={endLocationField.handleChange}
            />
            <div className="cut" style={{width: '100px'}}></div>
            <label htmlFor="endLocation" className="placeholder">
              End location
            </label>
          </span>
          &nbsp;
          <span style={{ display: "inline-block" }}>
            <button type="submit" className="submit" style={{color: 'white', backgroundColor: '#14133b'}}>
              SEARCH
            </button>
          </span>
        </form>
      </div>
      <SearchedFlights />
      <hr style={{ backgroundColor: "aqua", width: "80%" }}></hr>
    </>
  );
}

export default SearchForm;
