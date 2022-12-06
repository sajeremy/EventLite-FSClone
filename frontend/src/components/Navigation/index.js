import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { BsSearch } from "react-icons/bs";
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
            <span className="navbar-logo">eventlite</span>
          </NavLink>
          <div className="search-bar">
            <BsSearch className="icon" />
            <input
              className="search-input"
              type="text"
              placeholder="search events"
            />
          </div>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="#">Create an event</NavLink>
          <Link
            to={{
              pathname: "https://www.linkedin.com/in/jeremy-santiago-11b05367",
            }}
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link
            to={{ pathname: "https://github.com/sajeremy" }}
            target="_blank"
          >
            github
          </Link>
        </div>
      </>
    );
  }

  return <div>{sessionLinks}</div>;
};
export default Navigation;
