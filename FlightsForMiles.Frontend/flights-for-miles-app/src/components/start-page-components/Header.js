import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <div style={{ background: "#0b151c" }}>
      <Logo />
      <Navigation />
    </div>
  );
}

export default Header;
