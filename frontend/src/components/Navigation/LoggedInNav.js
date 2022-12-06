import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";
import { BsSearch, BsSuitHeart } from "react-icons/bs";
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
        <button onClick={openMenu}>
          <BiUserCircle />
          {sessionUser.email}
        </button>
        <NavLink to="#">
          <div>
            <TbTicket />
          </div>
          <div>Tickets</div>
        </NavLink>
        <NavLink to="#">
          <div>
            <BsSuitHeart />
          </div>
          <div>Likes</div>
        </NavLink>
        <NavLink to="#" className="create-event-button">
          <div>
            <AiOutlinePlus />
          </div>
          <div>Create an event</div>
        </NavLink>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{sessionUser.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
export default LoggedInNav;
