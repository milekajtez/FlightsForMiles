import React from "react";
import { useHistory, useParams } from "react-router";

function Navigation() {
  const { username } = useParams();
  const history = useHistory();

  const adminRegistration = () => {
    history.push(`/system/${username}/adminReg`);
  };

  const airlineRegistration = () => {
    history.push(`/system/${username}/airlineReg`);
  };

  const discountsSettings = () => {
    history.push(`/system/${username}/discSettings`);
  };

  const mining = () => {
    history.push(`/system/${username}/mining`);
  };

  return (
    <span>
      <ul className="menu-bar">
        <li onClick={() => adminRegistration()}>
          <i className="fas fa-user-plus"></i> Administrator registration
        </li>
        <div></div>
        <li onClick={() => airlineRegistration()}>
          <i className="fas fa-plane"></i> Airline registration
        </li>
        <div></div>
        <li onClick={() => discountsSettings()}>
          <i className="fas fa-percentage"></i> Discounts settings
        </li>
        <div></div>
        <li onClick={() => mining()}>
          <i className="fab fa-bitcoin"></i> Bitcoin work
        </li>
      </ul>
    </span>
  );
}

export default Navigation;
