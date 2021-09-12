import React from "react";
import { useAlert } from "react-alert";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import {
  changeFlight,
  loadFlights,
} from "../../../../redux/avio-admin/flight/flightAction";

function ChangeFlight(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const startTimeField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const endTimeField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const startLocationField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const endLocationField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const startHourField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const endHourField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const flightLengthField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const flightTimeField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const additionalInfoField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const numOfTransfersField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const allTransfersField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const planeNameField = useFormField({
    initialValue: "",
    isRequired: false,
  });
  const luggageWeightField = useFormField({
    initialValue: "",
    isRequired: false,
  });

  const changeFlightForm = useFormWithFields({
    onSubmit: (e) => {
      if (Validation()) {
        dispatch(
          changeFlight({
            flightID: props.changeIsOpen.currentFlight.flightID,
            startTime: startTimeField.value + " " + startHourField.value,
            endTime: endTimeField.value + " " + endHourField.value,
            startLocation: startLocationField.value,
            endLocation: endLocationField.value,
            flightTime: flightTimeField.value,
            flightLength: flightLengthField.value,
            numOfTransfers: numOfTransfersField.value,
            allTransfers: allTransfersField.value,
            planeName: planeNameField.value,
            lugageWeight: luggageWeightField.value,
            additionalInfo: additionalInfoField.value,
          })
        )
          .then((response) => {
            if (response.status === 204) {
              alert.show("Update successfully.", {
                type: "success",
              });

              changeFlightForm.handleReset();
              props.setChangeIsOpen({
                isOpen: !props.changeIsOpen.isOpen,
                currentFlight: props.changeIsOpen.currentFlight,
              });
              dispatch(loadFlights());
            } else {
              alert.show("Unknown error.", {
                type: "error",
              });
            }
          })
          .catch((error) => {
            console.error(error);
            if (
              error.response.data.indexOf(
                "(Updating unsuccessfully. Server not found flight for updating.)"
              ) !== -1
            ) {
              alert.show(
                "Updating unsuccessfully. Server not found flight for updating.",
                {
                  type: "error",
                }
              );
            } else {
              alert.show("Unknown error.", {
                type: "error",
              });
            }

            changeFlightForm.handleReset();
          });
      }

      e.preventDefault();
    },
    fields: [
      startTimeField,
      endTimeField,
      startHourField,
      endHourField,
      startLocationField,
      endLocationField,
      flightLengthField,
      flightTimeField,
      additionalInfoField,
      numOfTransfersField,
      allTransfersField,
      planeNameField,
      luggageWeightField,
    ],
  });

  function Validation() {
    if (
      startTimeField.value === "" &&
      endTimeField.value === "" &&
      startHourField.value === "" &&
      endHourField.value === "" &&
      startLocationField.value === "" &&
      endLocationField.value === "" &&
      flightLengthField.value === "" &&
      flightTimeField.value === "" &&
      additionalInfoField.value === "" &&
      numOfTransfersField.value === "" &&
      allTransfersField.value === "" &&
      planeNameField.value === "" &&
      luggageWeightField.value === ""
    ) {
      alert.show("If you want to update flight you must to insert new data.", {
        type: "info",
      });

      return false;
    }

    var timeError = "";
    var flightTimeError = "";
    var flightLengthError = "";
    var numOfTransfersError = "";
    var lugageWeightError = "";

    if (
      startTimeField.value !== "" &&
      endTimeField.value !== "" &&
      startHourField.value !== "" &&
      endHourField.value !== ""
    ) {
      var start = startTimeField.value + " " + startHourField.value;
      var end = endTimeField.value + " " + endHourField.value;
      var startDate = new Date(start);
      var endDate = new Date(end);

      if (
        startDate.getTime() === endDate.getTime() ||
        startDate.getTime() > endDate.getTime()
      ) {
        timeError = "Start time must be older then end time. ";
      }
    }

    if (flightTimeField.value !== "") {
      if (parseFloat(flightTimeField.value) <= 0) {
        flightTimeError = "Fligth time must be positive number. ";
      }
    }

    if (flightLengthField.value !== "") {
      if (parseFloat(flightLengthField.value) <= 0) {
        flightLengthError = "Fligth length must be positive number. ";
      }
    }

    if (numOfTransfersField.value !== "") {
      if (parseInt(numOfTransfersField.value) < 0) {
        numOfTransfersError = "Number of transfers can't be negative number. ";
      }
    }

    if (luggageWeightField.value !== "") {
      if (parseFloat(luggageWeightField.value) <= 0) {
        lugageWeightError = "Lugage weight must be positive number.";
      }
    }

    if (
      timeError === "" &&
      flightTimeError === "" &&
      flightLengthError === "" &&
      numOfTransfersError === "" &&
      lugageWeightError === ""
    ) {
      return true;
    }

    alert.show(
      timeError +
        flightTimeError +
        flightLengthError +
        numOfTransfersError +
        lugageWeightError,
      {
        type: "error",
      }
    );

    return false;
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.changeIsOpen.isOpen}
      closeTimeoutMS={500}
      className="new-member-inner-reg"
      onRequestClose={() =>
        props.setChangeIsOpen({
          isOpen: !props.changeIsOpen.isOpen,
          currentFlight: props.changeIsOpen.currentFlight,
        })
      }
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
      <div className="reg-box">
        <h2>CHANGE FLIGHT</h2>
        <form onSubmit={changeFlightForm.handleSubmit}>
          {props.changeIsOpen.currentFlight.startTime !== undefined ? (
            <>
              <div>
                <span className="user-box">
                  <input
                    type="date"
                    value={startTimeField.value}
                    required={startTimeField.isRequired}
                    onChange={startTimeField.handleChange}
                    id="startTimeField"
                  />
                  <label>
                    Start date time (
                    {props.changeIsOpen.currentFlight.startTime.split(" ")[0]})
                  </label>
                </span>
                <span className="user-box">
                  <input
                    type="date"
                    value={endTimeField.value}
                    required={endTimeField.isRequired}
                    onChange={endTimeField.handleChange}
                    id="endTimeField"
                    placeholder={props.changeIsOpen.currentFlight.endTime}
                  />
                  <label>
                    End date time (
                    {props.changeIsOpen.currentFlight.endTime.split(" ")[0]})
                  </label>
                </span>
              </div>
              <div>
                <span className="user-box">
                  <input
                    type="time"
                    value={startHourField.value}
                    required={startHourField.isRequired}
                    onChange={startHourField.handleChange}
                    id="startHourField"
                    placeholder={props.changeIsOpen.currentFlight.startTime}
                  />
                  <label>
                    Start hour time (
                    {props.changeIsOpen.currentFlight.startTime.split(" ")[1] +
                      " " +
                      props.changeIsOpen.currentFlight.startTime.split(" ")[2]}
                    )
                  </label>
                </span>
                <span className="user-box">
                  <input
                    type="time"
                    value={endHourField.value}
                    required={endHourField.isRequired}
                    onChange={endHourField.handleChange}
                    id="endHourField"
                    placeholder={props.changeIsOpen.currentFlight.endTime}
                  />
                  <label>
                    End hour time (
                    {props.changeIsOpen.currentFlight.endTime.split(" ")[1] +
                      " " +
                      props.changeIsOpen.currentFlight.endTime.split(" ")[2]}
                    )
                  </label>
                </span>
              </div>
              <div>
                <span className="user-box">
                  <input
                    type="text"
                    value={startLocationField.value}
                    required={startLocationField.isRequired}
                    onChange={startLocationField.handleChange}
                    id="startLocationField"
                    placeholder={props.changeIsOpen.currentFlight.startLocation}
                  />
                  <label>Start location</label>
                </span>
                <span className="user-box">
                  <input
                    type="text"
                    value={endLocationField.value}
                    required={endLocationField.isRequired}
                    onChange={endLocationField.handleChange}
                    id="endLocationField"
                    placeholder={props.changeIsOpen.currentFlight.endLocation}
                  />
                  <label>End location</label>
                </span>
              </div>
              <div>
                <span className="user-box">
                  <input
                    type="number"
                    value={flightTimeField.value}
                    required={flightTimeField.isRequired}
                    onChange={flightTimeField.handleChange}
                    id="flightTimeField"
                    placeholder={props.changeIsOpen.currentFlight.flightTime}
                  />
                  <label>Flight time (hours)</label>
                </span>
                <span className="user-box">
                  <input
                    type="number"
                    value={flightLengthField.value}
                    required={flightLengthField.isRequired}
                    onChange={flightLengthField.handleChange}
                    id="flightLengthField"
                    placeholder={
                      props.changeIsOpen.currentFlight.flightLengthKM
                    }
                  />
                  <label>Flight length (km)</label>
                </span>
              </div>
              <div>
                <span className="user-box">
                  <input
                    type="number"
                    value={numOfTransfersField.value}
                    required={numOfTransfersField.isRequired}
                    onChange={numOfTransfersField.handleChange}
                    id="numOfTransfersField"
                    placeholder={
                      props.changeIsOpen.currentFlight.numberOfTransfers
                    }
                  />
                  <label>Number of transfers</label>
                </span>
                <span className="user-box">
                  <input
                    type="text"
                    value={allTransfersField.value}
                    required={allTransfersField.isRequired}
                    onChange={allTransfersField.handleChange}
                    id="allTransfersField"
                    placeholder={props.changeIsOpen.currentFlight.allTransfers}
                  />
                  <label>
                    All transfers (for example: Belgrade-Budapest-Berlin)
                  </label>
                </span>
              </div>
              <div>
                <span className="user-box">
                  <input
                    type="text"
                    value={planeNameField.value}
                    required={planeNameField.isRequired}
                    onChange={planeNameField.handleChange}
                    id="planeNameField"
                    placeholder={props.changeIsOpen.currentFlight.planeName}
                  />
                  <label>Plane name</label>
                </span>
                <span className="user-box">
                  <input
                    type="number"
                    value={luggageWeightField.value}
                    required={luggageWeightField.isRequired}
                    onChange={luggageWeightField.handleChange}
                    id="luggageWeightField"
                    placeholder={props.changeIsOpen.currentFlight.lugageWeight}
                  />
                  <label>Lugage weight</label>
                </span>
              </div>
              <div>
                <span className="user-box">
                  <h6 style={{ color: "white" }}>Additional info</h6>
                  <textarea
                    type="text"
                    value={additionalInfoField.value}
                    required={additionalInfoField.isRequired}
                    onChange={additionalInfoField.handleChange}
                    id="additionalInfoField"
                    rows="4"
                    cols="50"
                    placeholder={
                      props.changeIsOpen.currentFlight.additionalInformation
                    }
                  />
                </span>
              </div>
              <div>
                <button type="submit" style={{ backgroundColor: "#141e30" }}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Change
                </button>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </Modal>
  );
}

export default ChangeFlight;
