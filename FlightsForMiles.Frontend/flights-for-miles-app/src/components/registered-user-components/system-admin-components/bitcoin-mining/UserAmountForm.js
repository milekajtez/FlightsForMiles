import React from "react";
import { useAlert } from "react-alert";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { addUserAmount } from "../../../../redux/system-admin/bitcoin-mining/bitcoinMiningAction";

function UserAmountForm(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const usernameField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const amountField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const typeField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const userAmountForm = useFormWithFields({
    onSubmit: (e) => {
      if (amountField.value < 0) {
        alert.show("You need to enter a positive amount value.", {
          type: "info",
        });
      } else {
        dispatch(
          addUserAmount({
            username: usernameField.value,
            type: typeField.value,
            amount: amountField.value,
          })
        )
          .then((response) => {
            if (response.status === 200) {
              alert.show("Define user amount successfully.", {
                type: "success",
              });

              props.setUserAmountModal(false);
              userAmountForm.handleReset();
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.data.indexOf("(User not found.)") !== -1) {
              alert.show("User not found.", {
                type: "error",
              });
            } else if (
              error.response.data.indexOf("(User's balance not found.)") !== -1
            ) {
              alert.show("User's balance not found.", {
                type: "error",
              });
            } else {
              alert.show("Unknown error", {
                type: "error",
              });
            }
          });
      }

      e.preventDefault();
    },
    fields: [usernameField, amountField, typeField],
  });

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.userAmountModal}
      closeTimeoutMS={500}
      className="new-member-inner-login"
      onRequestClose={() => props.setUserAmountModal(false)}
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
        <h2>Define user's amount</h2>
        <form onSubmit={userAmountForm.handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              value={usernameField.value}
              required={usernameField.isRequired}
              onChange={usernameField.handleChange}
              id="usernameField"
            />
            <label>Username</label>
          </div>
          <div type="text" className="user-box">
            <select
              value={typeField.value}
              required={typeField.isRequired}
              onChange={typeField.handleChange}
              id="typeField"
            >
              <option value=""></option>
              <option value="new">Define new amout</option>
              <option value="add">Add $ value to current amount</option>
            </select>
            <label>Type</label>
          </div>
          <div className="user-box">
            <input
              type="number"
              value={amountField.value}
              required={amountField.isRequired}
              onChange={amountField.handleChange}
              id="amountField"
            />
            <label>Value ($)</label>
          </div>
          <div>
            <button type="submit" style={{ backgroundColor: "#141e30" }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Define amount
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default UserAmountForm;
