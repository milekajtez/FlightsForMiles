import Modal from "react-modal";
import React from "react";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { useDispatch } from "react-redux";
import {
  addDestination,
  loadDestinations,
} from "../../../../redux/avio-admin/destination/destinationAction";
import { useEffect } from "react";
import { loadAirlines } from "../../../../redux/system-admin/airline-reg/airlineRegAction";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

function AddDestination(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const airlines = useSelector((state) => state.airline);

  useEffect(() => {
    dispatch(loadAirlines());
  }, [dispatch]);

  const nameField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const cityField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const countryField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const airlineField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const addDestinationForm = useFormWithFields({
    onSubmit: (e) => {
      dispatch(
        addDestination({
          airportName: nameField.value,
          city: cityField.value,
          country: countryField.value,
          airlineID: airlineField.value,
        })
      )
        .then((response) => {
          if (response.status === 201) {
            alert.show("Adding destination successfully.", {
              type: "success",
            });

            // ponovo ucitavanje svih destinacija..jer se baza izmenila
            dispatch(loadDestinations());

            addDestinationForm.handleReset();
            props.setAddIsOpen(false);
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
              "(Add destination is unsuccessffully. Server not found selected airline.)"
            ) !== -1
          ) {
            alert.show(
              "Add destination is unsuccessffully. Server not found selected airline.",
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
    fields: [nameField, cityField, countryField, airlineField],
  });

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.addIsOpen}
      closeTimeoutMS={500}
      className="new-member-inner-login"
      onRequestClose={() => props.setAddIsOpen(false)}
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
        <h2>ADD NEW DESTINATION</h2>
        <form onSubmit={addDestinationForm.handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              value={nameField.value}
              required={nameField.isRequired}
              onChange={nameField.handleChange}
              id="nameField"
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
            />
            <label>City</label>
          </div>
          <div className="user-box">
            <input
              value={countryField.value}
              required={countryField.isRequired}
              onChange={countryField.handleChange}
              id="countryField"
            />
            <label>Country</label>
          </div>
          <div type="text" className="user-box">
            <select
              value={airlineField.value}
              required={airlineField.isRequired}
              onChange={airlineField.handleChange}
              id="airlineField"
            >
              <option value=""></option>
              {airlines.allAirlines.map((airline) => {
                return (
                  <option key={airline.id} value={airline.id}>
                    {airline.name}
                  </option>
                );
              })}
            </select>
            <label>Airline</label>
          </div>
          <div>
            <button type="submit" style={{ backgroundColor: "#141e30" }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddDestination;
