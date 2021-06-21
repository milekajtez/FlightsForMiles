import React from "react";
import { useAlert } from "react-alert";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import {
  addTicket,
  loadTickets,
} from "../../../../redux/avio-admin/ticket/ticketAction";

function AddTicket(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const numberField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const typeField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const priceField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const isQuickBookingField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const addTicketForm = useFormWithFields({
    onSubmit: (e) => {
      if (Validation()) {
        dispatch(
          addTicket({
            number: numberField.value,
            type: typeField.value,
            price: priceField.value,
            isQuickBooking: isQuickBookingField.value,
            flightID: props.addTicket.flightID,
          })
        )
          .then((response) => {
            if (response.status === 201) {
              alert.show("Adding ticket successfully.", {
                type: "success",
              });

              dispatch(loadTickets(props.addTicket.flightID));

              addTicketForm.handleReset();
              props.setAddTicket({ isOpen: false, flightID: "" });
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
                "(Add ticket unsuccessfully. This flight already has ticket with entered number.)"
              ) !== -1
            ) {
              alert.show(
                "Add ticket unsuccessfully. This flight already has ticket with entered number.",
                {
                  type: "error",
                }
              );
            } else if (
              error.response.data.indexOf(
                "(Add ticket unsuccessfully. Flight dosn't exsist.)"
              ) !== -1
            ) {
              alert.show("Add ticket unsuccessfully. Flight dosn't exsist.", {
                type: "error",
              });
            } else if (
              error.response.data.indexOf(
                "(Add ticket unsuccessfully. Base already has this ticket.)"
              ) !== -1
            ) {
              alert.show(
                "Add ticket unsuccessfully. Base already has this ticket.",
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
      }

      e.preventDefault();
    },
    fields: [numberField, typeField, priceField, isQuickBookingField],
  });

  function Validation() {
    return true;
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.addTicket.isOpen}
      closeTimeoutMS={500}
      className="new-member-inner-login"
      onRequestClose={() => props.setAddTicket({ isOpen: false, flightID: "" })}
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
        <h2>ADD NEW TICKET</h2>
        <form onSubmit={addTicketForm.handleSubmit}>
          <div className="user-box">
            <input
              type="number"
              value={numberField.value}
              required={numberField.isRequired}
              onChange={numberField.handleChange}
              id="numberField"
            />
            <label>Ticket number</label>
          </div>
          <div className="user-box">
            <select
              value={typeField.value}
              required={typeField.isRequired}
              onChange={typeField.handleChange}
              id="typeField"
            >
              <option value=""></option>
              <option value="BUSINESS">BUSINESS</option>
              <option value="FIRST">FIRST</option>
              <option value="ECONOMIC">ECONOMIC</option>
            </select>
            <label>Ticket type</label>
          </div>
          <div className="user-box">
            <input
              type="number"
              value={priceField.value}
              required={priceField.isRequired}
              onChange={priceField.handleChange}
              id="priceField"
            />
            <label>Ticket price</label>
          </div>
          <div className="user-box">
            <select
              value={isQuickBookingField.value}
              required={isQuickBookingField.isRequired}
              onChange={isQuickBookingField.handleChange}
              id="isQuickBookingField"
            >
              <option value=""></option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            <label>Is quick booking?</label>
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

export default AddTicket;
