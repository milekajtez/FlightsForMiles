import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { fliterAction } from "../../../../../redux/avio-admin/flight/flightAction";
import SearchedBookingFlights from "./SearchedBookingFlights";

function SearchBookingFlightForm() {
  const flights = useSelector((state) => state.flight);
  const dispatch = useDispatch();

  const startDateField = useFormField({
    initialValue: "",
    isRequired: true,
  });
  const endDateField = useFormField({
    initialValue: "",
    isRequired: true,
  });
  const startHoursField = useFormField({
    initialValue: "",
    isRequired: true,
  });
  const endHoursField = useFormField({
    initialValue: "",
    isRequired: true,
  });
  const startLocationField = useFormField({
    initialValue: "",
    isRequired: true,
  });
  const endLocationField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const filterFlightsForm = useFormWithFields({
    onSubmit: (e) => {
      let filteredFlights = [];
      for (let i = 0; i < flights.allFlights.length; i++) {
        let searchStartTime = false;
        let searchEndTime = false;
        let searchStartLocation = false;
        let searchEndLocation = false;

        if (
          new Date(flights.allFlights[i].startTime).toString() ===
          new Date(startDateField.value + " " + startHoursField.value).toString()
        ) {
          searchStartTime = true;
        }

        if (
          new Date(flights.allFlights[i].endTime).toString() ===
          new Date(endDateField.value + " " + endHoursField.value).toString()
        ) {
          searchEndTime = true;
        }

        if (flights.allFlights[i].startLocation === startLocationField.value) {
          searchStartLocation = true;
        }

        if (flights.allFlights[i].endLocation === endLocationField.value) {
          searchEndLocation = true;
        }

        if (
          searchStartTime &&
          searchEndTime &&
          searchStartLocation &&
          searchEndLocation
        ) {
          filteredFlights.push(flights.allFlights[i]);
        }
      }

      dispatch(fliterAction(filteredFlights));
      filterFlightsForm.handleReset();
      e.preventDefault();
    },
    fields: [
      startDateField,
      endDateField,
      startHoursField,
      endHoursField,
      startLocationField,
      endLocationField,
    ],
  });
  return (
    <>
      <div
        className="form-search"
        style={{ display: "inline-block", marginTop: "1%", width: "90%" }}
      >
        <h3 className="subtitle" style={{paddingBottom: '8px'}}>FILTER FLIGHTS</h3>
        <form onSubmit={filterFlightsForm.handleSubmit}>
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="startDate"
              className="input"
              type="date"
              placeholder=" "
              value={startDateField.value}
              onChange={startDateField.handleChange}
              style={{ paddingRight: "5px" }}
              required={startDateField.isRequired}
            />
            <div className="cut" style={{ width: "100px" }}></div>
            <label htmlFor="startDate" className="placeholder">
              Start date time
            </label>
          </span>
          &nbsp;
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="endDate"
              className="input"
              type="date"
              placeholder=" "
              value={endDateField.value}
              onChange={endDateField.handleChange}
              style={{ paddingRight: "5px" }}
              required={endDateField.isRequired}
            />
            <div className="cut" style={{ width: "100px" }}></div>
            <label htmlFor="endDate" className="placeholder">
              End date time
            </label>
          </span>
          &nbsp;
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="startHours"
              className="input"
              type="time"
              placeholder=" "
              value={startHoursField.value}
              onChange={startHoursField.handleChange}
              style={{ paddingRight: '5px' }}
              required={startHoursField.isRequired}
            />
            <div className="cut" style={{width: '100px'}}></div>
            <label htmlFor="startHours" className="placeholder">
              Start hours time
            </label>
          </span>
          &nbsp;
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="endHours"
              className="input"
              type="time"
              placeholder=" "
              value={endHoursField.value}
              onChange={endHoursField.handleChange}
              style={{ paddingRight: '5px' }}
              required={endHoursField.isRequired}
            />
            <div className="cut" style={{width: '100px'}}></div>
            <label htmlFor="endHours" className="placeholder">
              End hours time
            </label>
          </span>
          &nbsp;
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="startLocation"
              className="input"
              type="text"
              placeholder=" "
              value={startLocationField.value}
              onChange={startLocationField.handleChange}
              style={{ paddingRight: '5px' }}
              required={startLocationField.isRequired}
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
              style={{ paddingRight: '5px' }}
              required={endLocationField.isRequired}
            />
            <div className="cut" style={{width: '100px'}}></div>
            <label htmlFor="endLocation" className="placeholder">
              End location
            </label>
          </span>
          &nbsp;
          <span style={{ display: "inline-block" }}>
            <button type="submit" className="submit">
              FILTER
            </button>
          </span>
        </form>
      </div>
      <SearchedBookingFlights />
    </>
  );
}

export default SearchBookingFlightForm;
