import React from "react";
import { useSelector } from "react-redux";
import SearchedFriends from "./SearchedFriends";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { searchAction } from "../../../../../redux/regular-user/friendship/friendshipAction";

function SearchForm() {
  const friendship = useSelector((state) => state.friendship);
  const alert = useAlert();
  const dispatch = useDispatch();

  const usernameField = useFormField({
    initialValue: "",
  });
  const firstnameField = useFormField({
    initialValue: "",
  });
  const lastnameField = useFormField({
    initialValue: "",
  });

  const searchFriendsForm = useFormWithFields({
    onSubmit: (e) => {
      if (SearchValidation()) {
        let searchedFriends = [];
        for (let i = 0; i < friendship.friends.length; i++) {
          let searchUsername = true;
          let searchFirstname = true;
          let searchLastname = true;

          if (usernameField.value !== "") {
            if (friendship.friends[i].username === usernameField.value) {
              searchUsername = true;
            } else {
              searchUsername = false;
            }
          }

          if (firstnameField.value !== "") {
            if (friendship.friends[i].firstname === firstnameField.value) {
              searchFirstname = true;
            } else {
              searchFirstname = false;
            }
          }

          if (lastnameField.value !== "") {
            if (friendship.friends[i].lastname === lastnameField.value) {
              searchLastname = true;
            } else {
              searchLastname = false;
            }
          }

          if (searchUsername && searchFirstname && searchLastname) {
            searchedFriends.push(friendship.friends[i]);
          }
        }

        dispatch(searchAction(searchedFriends));

        searchFriendsForm.handleReset();
      }

      e.preventDefault();
    },
    fields: [usernameField, firstnameField, lastnameField],
  });

  function SearchValidation() {
    if (
      usernameField.value === "" &&
      firstnameField.value === "" &&
      lastnameField.value === ""
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
        className="form-search"
        style={{ display: "inline-block", marginTop: "1%" }}
      >
        <h3 className="subtitle">SEARCH FRIEND</h3>
        <form onSubmit={searchFriendsForm.handleSubmit}>
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="username"
              className="input"
              type="text"
              placeholder=" "
              value={usernameField.value}
              onChange={usernameField.handleChange}
            />
            <div className="cut"></div>
            <label htmlFor="username" className="placeholder">
              Username
            </label>
          </span>
          &nbsp;
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="firstname"
              className="input"
              type="text"
              placeholder=" "
              value={firstnameField.value}
              onChange={firstnameField.handleChange}
            />
            <div className="cut"></div>
            <label htmlFor="firstname" className="placeholder">
              First name
            </label>
          </span>
          &nbsp;
          <span className="input-container" style={{ display: "inline-block" }}>
            <input
              id="lastname"
              className="input"
              type="text"
              placeholder=" "
              value={lastnameField.value}
              onChange={lastnameField.handleChange}
            />
            <div className="cut"></div>
            <label htmlFor="lastname" className="placeholder">
              Last name
            </label>
          </span>
          &nbsp;
          <span style={{ display: "inline-block" }}>
            <button type="submit" className="submit" style={{backgroundColor: '#14133b'}}>
              SEARCH
            </button>
          </span>
        </form>
      </div>
      <SearchedFriends />
      <hr style={{ backgroundColor: "aqua", width: "80%" }}></hr>
    </>
  );
}

export default SearchForm;
