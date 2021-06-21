import React from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  cancelRequest,
  loadRequests,
} from "../../../../../redux/regular-user/friendship/friendshipAction";

function MyRequest(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const cancel = () => {
    dispatch(cancelRequest(params.username, props.request.username))
      .then((response) => {
        if (response.status === 204) {
          alert.show("Canceling request successfully.", {
            type: "success",
          });

          dispatch(loadRequests(params.username, "fromMe"));
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
            "(Canceling unsuccessfully. Request doesn't exsist.)"
          ) !== -1
        ) {
          alert.show("Canceling unsuccessfully. Request doesn't exsist.", {
            type: "error",
          });
        } else {
          alert.show("Unknown error.", {
            type: "error",
          });
        }
      });
  };

  return (
    <div>
      <div className="dropdown-divider"></div>
      <div className="dropdown-item">
        <img
          src="https://orig00.deviantart.net/d7b0/f/2011/166/d/4/avatar_100x100_by_demonfox_zephz-d3iyw6a.png"
          alt=""
          className="rounded-circle"
          style={{ width: "50px", height: "50px" }}
        />
        <div
          className="text-left user-item"
          style={{
            display: "inline-block",
            marginLeft: "10px",
            width: "auto",
            marginRight: "10px",
          }}
        >
          {props.request.firstname}
          <br></br>
          {props.request.lastname}
        </div>
        <span
          className="text-right"
          style={{ float: "right", marginTop: "2%" }}
        >
          <input
            type="button"
            className="btn btn-danger btn-sm"
            value="Cancel request"
            onClick={() => cancel()}
          />
        </span>
      </div>
    </div>
  );
}

export default MyRequest;
