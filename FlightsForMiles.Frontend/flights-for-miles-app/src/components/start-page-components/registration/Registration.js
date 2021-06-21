import { useAlert } from "react-alert";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { userRegistration } from "../../../redux/start-page/registration/registrationAction";

function Registration(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  //#region Form's field and calling redux action
  const usernameField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const emailField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const passwordField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const confirmPasswordField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const firstNameField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const lastNameField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const pinField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const addressField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const telephoneField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const passportField = useFormField({
    initialValue: "",
    isRequired: false,
  });

  const regForm = useFormWithFields({
    onSubmit: (e) => {
      e.preventDefault();
      props.setRegIsOpen(false);

      if (Validation()) {
        dispatch(
          userRegistration({
            username: usernameField.value,
            email: emailField.value,
            password: passwordField.value,
            firstname: firstNameField.value,
            lastname: lastNameField.value,
            pin: pinField.value,
            address: addressField.value,
            telephone: telephoneField.value,
            passport: passportField.value,
          })
        )
          .then((response) => {
            if (response.status === 201) {
              alert.show("User registration successfully.", {
                type: "success",
              });
            }
          })
          .catch((error) => {
            console.error(error);
            if (
              error.response.data.indexOf(
                "(Entered username has been reserved already.)"
              ) !== -1
            ) {
              alert.show(
                "Registration unsuccesfully. Entered username has been reserved already.",
                {
                  type: "error",
                }
              );
            } else if (
              error.response.data.indexOf(
                "(Please enter a different personal identify number.)"
              ) !== -1
            ) {
              alert.show(
                "Registration unsuccesfully. Please enter a different personal identify number.",
                {
                  type: "error",
                }
              );
            } else {
              alert.show("Unknown error", {
                type: "error",
              });
            }
          });

        regForm.handleReset();
      }
    },
    fields: [
      usernameField,
      emailField,
      passwordField,
      confirmPasswordField,
      firstNameField,
      lastNameField,
      pinField,
      addressField,
      telephoneField,
      passportField,
    ],
  });
  //#endregion
  //#region Form fields validation
  function Validation() {
    // password validation
    if (
      passwordField.value.length < 8 ||
      confirmPasswordField.value.length < 8
    ) {
      alert.show("Minimum number of caracters in password is 8!", {
        type: "error",
        /*onOpen: () => {},
                onClose: () => {}*/
      });
      return false;
    } else {
      if (passwordField.value !== confirmPasswordField.value) {
        alert.show("Please insert the same password and confirm password!", {
          type: "error",
        });
        return false;
      }
    }

    // PIN validation
    if (isNaN(Number(pinField.value)) || pinField.value.length !== 13) {
      alert.show(
        "Please insert a valid Personal identity number! This number must to have 13 digits! (For example '3006997800000')",
        {
          type: "error",
        }
      );
      return false;
    }

    // telephone validation
    if (isNaN(Number(telephoneField.value))) {
      alert.show(
        "Please insert a valid phone number! (For example '0628508315')",
        {
          type: "error",
        }
      );
      return false;
    }

    // passport validation
    if (passportField.value.trim() !== "") {
      if (isNaN(Number(passportField.value))) {
        alert.show(
          "Please insert a valid passport number! Passport should have 9 digits (For example '123456789')",
          {
            type: "error",
          }
        );
        return false;
      }
    }

    return true;
  }
  //#endregion

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.regIsOpen}
      closeTimeoutMS={500}
      className="new-member-inner-reg"
      onRequestClose={() => props.setRegIsOpen(false)}
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
        <h2>Register</h2>
        <form onSubmit={regForm.handleSubmit}>
          <div>
            <span className="user-box">
              <input
                type="text"
                value={usernameField.value}
                required={usernameField.isRequired}
                onChange={usernameField.handleChange}
                id="usernameField"
              />
              <label>Username</label>
            </span>
            <span className="user-box">
              <input
                type="email"
                value={emailField.value}
                required={emailField.isRequired}
                onChange={emailField.handleChange}
                id="emailField"
              />
              <label>Email</label>
            </span>
          </div>
          <div>
            <span className="user-box">
              <input
                type="password"
                value={passwordField.value}
                required={passwordField.isRequired}
                onChange={passwordField.handleChange}
                id="passwordField"
              />
              <label>Password</label>
            </span>
            <span className="user-box">
              <input
                type="password"
                value={confirmPasswordField.value}
                required={confirmPasswordField.isRequired}
                onChange={confirmPasswordField.handleChange}
                id="confirmPasswordField"
              />
              <label>Confirm password</label>
            </span>
          </div>
          <div>
            <span className="user-box">
              <input
                type="text"
                value={firstNameField.value}
                required={firstNameField.isRequired}
                onChange={firstNameField.handleChange}
                id="firstNameField"
              />
              <label>First name</label>
            </span>
            <span className="user-box">
              <input
                type="text"
                value={lastNameField.value}
                required={lastNameField.isRequired}
                onChange={lastNameField.handleChange}
                id="lastNameField"
              />
              <label>Last name</label>
            </span>
          </div>
          <div>
            <span className="user-box">
              <input
                type="text"
                value={pinField.value}
                required={pinField.isRequired}
                onChange={pinField.handleChange}
                id="pinField"
              />
              <label>Personal identity number</label>
            </span>
            <span className="user-box">
              <input
                type="text"
                value={addressField.value}
                required={addressField.isRequired}
                onChange={addressField.handleChange}
                id="addressField"
              />
              <label>Address</label>
            </span>
          </div>
          <div>
            <span className="user-box">
              <input
                type="text"
                value={telephoneField.value}
                required={telephoneField.isRequired}
                onChange={telephoneField.handleChange}
                id="telephoneField"
              />
              <label>Telephone number</label>
            </span>
            <span className="user-box">
              <input
                type="text"
                value={passportField.value}
                required={passportField.isRequired}
                onChange={passportField.handleChange}
                id="passportField"
              />
              <label>Passport number</label>
            </span>
          </div>
          <div>
            <button type="submit" style={{ backgroundColor: "#141e30" }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Register
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Registration;
