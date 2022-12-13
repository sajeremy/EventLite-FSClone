import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, Redirect } from "react-router-dom";
import "./Navigation.css";
import { BsSearch, BsSuitHeart, BsChevronDown } from "react-icons/bs";
import { TbTicket } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import * as sessionActions from "../../store/session";

const LoggedInNav = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    document.getElementById("user-drop-down").style.backgroundColor =
      "#f5f5f5f1";
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
      document.getElementById("user-drop-down").style.backgroundColor =
        "transparent";
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // <Redirect to="/login" />;
  };

  return (
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
        <button id="user-drop-down" onClick={openMenu}>
          <div>
            {/* style={{ fontSize: "25px" }}  */}
            <BiUserCircle className="user-icon" />
          </div>
          <div className="session-email">{sessionUser.email}</div>
          <div>
            <BsChevronDown className="down-arrow" />
          </div>
        </button>
        {showMenu && (
          <div id="profile-dropdown-container">
            <ul className="profile-dropdown">
              <li>
                <Link className="tickets-dropdown-button" to="#">
                  Tickets (4)
                </Link>
              </li>
              <li>
                <Link className="likes-dropdown-button" to="#">
                  Liked (5)
                </Link>
              </li>
              <li>
                <Link className="likes-dropdown-button" to="#">
                  Created Events (2)
                </Link>
              </li>
              <li>
                <Link className="log-out-button" to="#" onClick={logout}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        )}
        <NavLink className="ticket-button" to="#">
          <div>
            <TbTicket />
          </div>
          <p>Tickets</p>
        </NavLink>
        <NavLink className="likes-button" to="#">
          <div>
            <BsSuitHeart />
          </div>
          <p>Likes</p>
        </NavLink>
        <NavLink className="login-create-event-button" to="/events/create">
          <div>
            <AiOutlinePlus />
          </div>
          <p>Create an event</p>
        </NavLink>
        {/* {showMenu && (
          <div id="profile-dropdown-container">
            <ul className="profile-dropdown">
              <li>
                <Link className="tickets-dropdown-button" to="#">
                  Tickets (4)
                </Link>
              </li>
              <li>
                <Link className="likes-dropdown-button" to="#">
                  Liked
                </Link>
              </li>
              <li>
                <Link className="log-out-button" to="#" onClick={logout}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </>
  );
};
export default LoggedInNav;
