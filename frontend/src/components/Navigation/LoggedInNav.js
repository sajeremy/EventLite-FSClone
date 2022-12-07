import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";
import { BsSearch, BsSuitHeart, BsChevronDown } from "react-icons/bs";
import { TbTicket } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import * as sessionActions from "../../store/session";

const LoggedInNav = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
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
        <button id="user-drop-down" onClick={openMenu}>
          <span>
            <BiUserCircle className="user-icon" />
          </span>
          <span>{sessionUser.email}</span>
          <span>
            <BsChevronDown className="down-arrow" />
          </span>
        </button>
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
        <NavLink className="login-create-event-button" to="#">
          <div>
            <AiOutlinePlus />
          </div>
          <p>Create an event</p>
        </NavLink>
        {showMenu && (
          <div id="profile-dropdown-container">
            <ul className="profile-dropdown">
              <li>
                <button className="log-out-button" onClick={logout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
export default LoggedInNav;
