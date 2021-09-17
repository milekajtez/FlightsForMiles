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
  const startLocationField = useFormField({
    initialValue: "",
    isRequired: true,
  });
  const endLocationField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const getDayOrMounth = (dayOrMounth) => {
    return !dayOrMounth.indexOf("0") === 1
      ? dayOrMounth
      : dayOrMounth.replace("0", "");
  };

  const compareDates = (date1, date2) => {
    let day = false;
    let mounth = false;
    let year = false;

    if (
      getDayOrMounth(date1.split("/")[1]) ===
      getDayOrMounth(date2.split("-")[2])
    )
      day = true;
    if (
      getDayOrMounth(date1.split("/")[0]) ===
      getDayOrMounth(date2.split("-")[1])
    )
      mounth = true;
    if (date1.split("/")[2] === date2.split("-")[0]) year = true;
    console.log(day, mounth, year);
    return day && mounth && year;
  };

  const filterFlightsForm = useFormWithFields({
    onSubmit: (e) => {
      let filteredFlights = [];
      for (let i = 0; i < flights.allFlights.length; i++) {
        let searchStartTime = false;
        let searchEndTime = false;
        let searchStartLocation = false;
        let searchEndLocation = false;

        if (
          compareDates(
            flights.allFlights[i].startTime.split(" ")[0],
            startDateField.value
          )
        ) {
          searchStartTime = true;
        }

        if (
          compareDates(
            flights.allFlights[i].endTime.split(" ")[0],
            endDateField.value
          )
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
        <h3 className="subtitle" style={{ paddingBottom: "8px" }}>
          FILTER FLIGHTS
        </h3>
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
              id="startLocation"
              className="input"
              type="text"
              placeholder=" "
              value={startLocationField.value}
              onChange={startLocationField.handleChange}
              style={{ paddingRight: "5px" }}
              required={startLocationField.isRequired}
            />
            <div className="cut" style={{ width: "100px" }}></div>
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
              style={{ paddingRight: "5px" }}
              required={endLocationField.isRequired}
            />
            <div className="cut" style={{ width: "100px" }}></div>
            <label htmlFor="endLocation" className="placeholder">
              End location
            </label>
          </span>
          &nbsp;
          <span style={{ display: "inline-block" }}>
            <button
              type="submit"
              className="submit"
              style={{ backgroundColor: "#14133b" }}
            >
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
