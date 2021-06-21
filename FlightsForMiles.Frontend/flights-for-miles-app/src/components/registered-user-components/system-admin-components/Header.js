import React from "react";
import Navigation from "./Navigation";
import Logo from "../../start-page-components/Logo";
import SystemAdminMenu from "./SystemAdminMenu";

function Header() {
  return (
    <div style={{ background: "#0b151c" }}>
      <Logo />
      <Navigation />
      <SystemAdminMenu />
    </div>
  );
}

export default Header;
