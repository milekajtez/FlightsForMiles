import React, { useState } from "react";
import { useAlert } from "react-alert";
import Help from "./help/Help";
import Login from "./logging-in/Login";
import Registration from "./registration/Registration";
import GoogleLogin from "react-google-login";
import { loginViaGoogle } from "../../redux/start-page/login/loginAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

function Navigation() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [regIsOpen, setRegIsOpen] = useState(false);

  const responseGoogle = (response) => {
    var currentUser = response.Qs.Se;
    dispatch(loginViaGoogle(response))
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("User_JWT_Token", response.data.token);

          history.push(`/regular/${currentUser}`);

          alert.show("Login successfully", {
            type: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.indexOf("(Login via google unsuccessfully.)") !==
          -1
        ) {
          alert.show("User login unsuccesfully.", {
            type: "error",
          });
        } else {
          alert.show("Unknown error.", {
            type: "error",
          });
        }
      });
  };

  const airlineAndFlight = () => {
    history.push(`/airlineReview`);
  };

  return (
    <span>
      <ul className="menu-bar">
        <li onClick={() => airlineAndFlight()}>
          <i className="fas fa-plane-departure"></i> Airlines and Flights
        </li>
        <div></div>
        <li onClick={() => setHelpIsOpen(true)}>
          <i className="far fa-question-circle"></i> Help
        </li>
        <Help helpIsOpen={helpIsOpen} setHelpIsOpen={setHelpIsOpen} />
        <div></div>
        <li>
          <i className="fab fa-google"></i>
          <GoogleLogin
            clientId="204173179640-u087p5rhifds30i6u1nt21kragpe893b.apps.googleusercontent.com"
            render={(renderProps) => (
              <span
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                {" "}
                Login with Google
              </span>
            )}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            isSignedIn={false}
            cookiePolicy={"single_host_origin"}
          />
        </li>
        <div></div>
        <li onClick={() => setLoginIsOpen(true)}>
          <i className="fas fa-sign-in-alt"></i> Sign in
        </li>
        <Login loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen} />
        <div></div>
        <li onClick={() => setRegIsOpen(true)}>
          <i className="fas fa-user-plus"></i> Sign up
        </li>
        <Registration regIsOpen={regIsOpen} setRegIsOpen={setRegIsOpen} />
      </ul>
    </span>
  );
}

export default Navigation;
