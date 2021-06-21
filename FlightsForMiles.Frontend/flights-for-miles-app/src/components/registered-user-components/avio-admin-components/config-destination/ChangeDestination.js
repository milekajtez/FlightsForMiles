import React from "react";
import { useAlert } from "react-alert";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import {
  changeDestination,
  loadDestinations,
} from "../../../../redux/avio-admin/destination/destinationAction";

function ChangeDestination(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const nameField = useFormField({
    initialValue: "",
    isRequired: false,
  });

  const cityField = useFormField({
    initialValue: "",
    isRequired: false,
  });

  const countryField = useFormField({
    initialValue: "",
    isRequired: false,
  });

  const changeDestinationForm = useFormWithFields({
    onSubmit: (e) => {
      dispatch(
        changeDestination({
          airportID: props.changeIsOpen.currentDest.airportID,
          airportName: nameField.value,
          city: cityField.value,
          country: countryField.value,
          airlineID: props.changeIsOpen.currentDest.airlineID,
        })
      )
        .then((response) => {
          if (response.status === 204) {
            alert.show("Update successfully.", {
              type: "success",
            });

            changeDestinationForm.handleReset();
            props.setChangeIsOpen({
              open: !props.changeIsOpen.open,
              currentDest: props.changeIsOpen.currentDest,
            });

            dispatch(loadDestinations());
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
              "(Updating unsuccessfully. Server not found destination for updating.)"
            ) !== -1
          ) {
            alert.show(
              "Updating unsuccessfully. Server not found destination for updating.",
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

      e.preventDefault();
    },
    fields: [nameField, cityField, countryField],
  });

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.changeIsOpen.open}
      closeTimeoutMS={500}
      className="new-member-inner-login"
      onRequestClose={() =>
        props.setChangeIsOpen({
          open: !props.changeIsOpen.open,
          currentDest: props.changeIsOpen.currentDest,
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
      <div className="login-box">
        <h2>CHANGE DESTINATION</h2>
        <form onSubmit={changeDestinationForm.handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              value={nameField.value}
              required={nameField.isRequired}
              onChange={nameField.handleChange}
              id="nameField"
              placeholder={props.changeIsOpen.currentDest.airportName}
            />
            <label>Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={cityField.value}
              required={cityField.isRequired}
              onChange={cityField.handleChange}
              id="cityField"
              placeholder={props.changeIsOpen.currentDest.city}
            />
            <label>City</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={countryField.value}
              required={countryField.isRequired}
              onChange={countryField.handleChange}
              id="countryField"
              placeholder={props.changeIsOpen.currentDest.country}
            />
            <label>Country</label>
          </div>
          <div className="user-box">
            <button type="submit" style={{ backgroundColor: "#141e30" }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Change
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ChangeDestination;
