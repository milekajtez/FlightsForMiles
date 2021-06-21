import React from "react";
import Logo from "../../start-page-components/Logo";
import Navigation from "./Navigation";
import RegularUserMenu from "./RegularUserMenu";

function Header() {
  return (
    <div style={{ background: "#0b151c" }}>
      <Logo />
      <Navigation />
      <RegularUserMenu />
    </div>
  );
}

export default Header;
