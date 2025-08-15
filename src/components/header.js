import React from "react";
import "../styles/header.scss";
import logo from "../public/logo1.png";


export default function Header() {
  return (
    <header className="signup-header">
      <div className="header-left">
      <img src={logo} alt="logo" className="header-logo" />
      </div>
      <div className="header-right">
        Already have an account?{" "}
        <a href="./public/login" className="signin-link">
          Sign In
        </a>
      </div>
    </header>
  );
}
