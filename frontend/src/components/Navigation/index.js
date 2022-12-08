import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { BsSearch, BsGithub, BsLinkedin } from "react-icons/bs";
import LoggedInNav from "./LoggedInNav";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <LoggedInNav />;
  } else {
    sessionLinks = (
      <>
        <div className="navbar">
          <NavLink className="eventbrite-button" to={"/"}>
            <h3 className="navbar-logo">eventlite</h3>
          </NavLink>
          <div className="search-bar">
            <BsSearch className="icon" />
            <input
              className="search-input"
              type="text"
              placeholder="search events"
            />
          </div>
          <NavLink className="logged-out-signup-button" to="/signup">
            Sign Up
          </NavLink>
          <NavLink className="logged-out-login-button" to="/login">
            Log In
          </NavLink>
          <NavLink to="#" className="logged-create-event-button">
            Create an event
          </NavLink>
          <Link
            to={{
              pathname: "https://www.linkedin.com/in/jeremy-santiago-11b05367",
            }}
            target="_blank"
            className="linkedin-link"
          >
            <BsLinkedin style={{ fontSize: "25px" }} />
          </Link>
          <Link
            to={{ pathname: "https://github.com/sajeremy" }}
            target="_blank"
            className="github-link"
          >
            <BsGithub style={{ fontSize: "25px" }} />
          </Link>
        </div>
      </>
    );
  }

  return <div>{sessionLinks}</div>;
};
export default Navigation;
