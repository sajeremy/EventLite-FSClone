import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navigation.css";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <div>
          <NavLink to="/">EventLite</NavLink>
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

  return (
    <ul>
      <li>{sessionLinks}</li>
    </ul>
  );
};
export default Navigation;
