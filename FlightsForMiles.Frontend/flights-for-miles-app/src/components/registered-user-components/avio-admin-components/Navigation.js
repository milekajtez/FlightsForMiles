import React from "react";
import { useHistory, useParams } from "react-router";

function Navigation() {
  const { username } = useParams();
  const history = useHistory();

  const destinationConfiguration = () => {
    history.push(`/avio/${username}/configD`);
  };

  const flightConfiguration = () => {
    history.push(`/avio/${username}/configF`);
  };

  const seatsConfiguration = () => {
    history.push(`/avio/${username}/configS`);
  };

  const airlineReview = () => {
    history.push(`/avio/${username}/airlineReview`);
  };

  const helpConfiguration = () => {
    history.push(`/avio/${username}/configH`);
  };
  return (
    <span>
      <ul className="menu-bar">
        <li onClick={() => destinationConfiguration()}>
          <i className="fas fa-map-marked-alt"></i> Destination configuration
        </li>
        <div></div>
        <li onClick={() => flightConfiguration()}>
          <i className="fas fa-plane"></i> Flight configuration
        </li>
        <div></div>
        <li onClick={() => seatsConfiguration()}>
          <i className="fas fa-ticket-alt"></i> Seats configuration
        </li>
        <div></div>
        <li onClick={() => airlineReview()}>
          <i className="fas fa-plane-departure"></i> Airlines review
        </li>
        <div></div>
        <li onClick={() => helpConfiguration()}>
          <i className="far fa-question-circle"></i> Help configuration
        </li>
      </ul>
    </span>
  );
}

export default Navigation;
