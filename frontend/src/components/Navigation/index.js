import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/">EventLite</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="#">Create an event</NavLink>
        <NavLink
          to="https://www.linkedin.com/in/jeremy-santiago-11b05367"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin fa-xl"></i>
        </NavLink>
        <NavLink to="https://github.com/sajeremy" target="_blank">
          <i className="fa-brands fa-github fa-xl"></i>
        </NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>{sessionLinks}</li>
    </ul>
  );
};
export default Navigation;
