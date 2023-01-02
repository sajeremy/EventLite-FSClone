import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useHistory, Redirect } from "react-router-dom";
import { getCreatedEvents, fetchEvents } from "../../store/event.js";
import { fetchUserTickets } from "../../store/ticket.js";
import "./Navigation.css";
import { BsSearch, BsSuitHeart, BsChevronDown } from "react-icons/bs";
import { TbTicket } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import * as sessionActions from "../../store/session";
import { fetchUserLikes, getLikes } from "../../store/like.js";

const LoggedInNav = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  let numCreatedEvents;
  const organizedEvents = useSelector(getCreatedEvents);
  const purcahsedTickets = useSelector(
    (state) => Object.keys(state.tickets).length
  );
  const userLikes = useSelector((state) => state.likes.length);
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

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchUserTickets());
    dispatch(fetchUserLikes());
  }, []);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/login");
    // <Redirect to="/login" />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("action");
  };

  return (
    <>
      <div className="navbar">
        <NavLink
          className="eventbrite-button"
          onClick={() => window.location.reload()}
          to={"/"}
        >
          <h3 className="navbar-logo">eventlite</h3>
        </NavLink>
        <div className="search-bar">
          <BsSearch className="icon" />
          <form className="index-page-form" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="search-input"
              type="text"
              placeholder="search events"
            />
          </form>
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
                <Link
                  className="tickets-dropdown-button"
                  to={`/users/${sessionUser.id}/tickets`}
                >
                  Tickets ({purcahsedTickets})
                </Link>
              </li>
              <li>
                <Link
                  className="likes-dropdown-button"
                  to={`/users/${sessionUser.id}/likes`}
                >
                  Liked ({userLikes})
                </Link>
              </li>
              <li>
                <Link
                  className="likes-dropdown-button"
                  to={`/users/${sessionUser.id}/events`}
                >
                  {/* Created Events ({numCreatedEvents}) */}
                  Created Events ({organizedEvents.length})
                </Link>
              </li>
              <li>
                <Link
                  className="log-out-button"
                  to={`/signup`}
                  onClick={logout}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        )}
        <NavLink
          className="ticket-button"
          to={`/users/${sessionUser.id}/tickets`}
        >
          <div>
            <TbTicket />
          </div>
          <p>Tickets</p>
        </NavLink>
        <NavLink className="likes-button" to={`/users/${sessionUser.id}/likes`}>
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
      </div>
    </>
  );
};
export default LoggedInNav;
