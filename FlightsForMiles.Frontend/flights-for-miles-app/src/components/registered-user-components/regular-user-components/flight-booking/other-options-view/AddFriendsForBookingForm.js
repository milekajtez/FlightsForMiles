import React from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { addFriendForBooking, chooseFriendForBooking } from "../../../../../redux/regular-user/friendship/friendshipAction";

function AddFriendsForBookingForm() {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const usernameField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const passportField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const addFriendsForBookingForm = useFormWithFields({
    onSubmit: (e) => {
      dispatch(
        chooseFriendForBooking({
          username: usernameField.value,
          passport: passportField.value,
          myusername: params.username,
        })
      )
        .then((response) => {
          if (response.status === 200) {
            dispatch(addFriendForBooking(response.data));
            alert.show("Select friend for booking successfully.", {
              type: "success",
            });
          }

          addFriendsForBookingForm.handleReset();
        })
        .catch((error) => {
            console.log(error)
          if (
            error.response.data.indexOf(
              "(Server not found friend with entered username / passport.)"
            ) !== -1
          ) {
            alert.show(
              "Server not found friend with entered username / passport.",
              {
                type: "error",
              }
            );
          } else if (
            error.response.data.indexOf("(Server not found user.)") !== -1
          ) {
            alert.show("Server not found user.", {
              type: "error",
            });
          } else {
            alert.show("Unknown error.", {
              type: "error",
            });
          }
        });

      e.preventDefault();
    },
    fields: [usernameField, passportField],
  });

  return (
    <div
      className="box"
      style={{ width: "60%", margin: "auto", paddingBottom: "8px" }}
    >
      <h2 style={{ color: "white", marginTop: "8px" }}>CHOOSE FRIENDS</h2>
      <form onSubmit={addFriendsForBookingForm.handleSubmit}>
        <div>
          <br></br>
          <input
            type="text"
            value={usernameField.value}
            required={usernameField.isRequired}
            onChange={usernameField.handleChange}
            id="usernameField"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="number"
            value={passportField.value}
            required={passportField.isRequired}
            onChange={passportField.handleChange}
            id="passportField"
            placeholder="Passport"
          />
        </div>
        <div>
          <button type="submit" style={{ backgroundColor: "#141e30" }}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            CHOOSE FRIEND
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFriendsForBookingForm;
