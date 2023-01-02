import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { createLike, deleteLike } from "../../store/like";
import { likeEvent, unlikeEvent } from "../../store/event";
import "./LikedEventsIndexPage.css";

const LikedEventItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { event } = props;
  // if (!event) {
  //   return null;
  // }
  const likesArr = useSelector((state) => (state.likes ? state.likes : []));
  const [likeStatus, setLikeStatus] = useState(
    likesArr.includes(event.id) ? true : false
  );
  const sessionUserId = useSelector((state) =>
    state.session.user ? state.session.user.id : null
  );
  const eventsObj = useSelector((state) =>
    state.events ? state.events : null
  );
  const startDate = event.startDatetime;
  const dateObj = new Date(startDate);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const colors = ["240-128-128", "255-165-0", "224-255-255", "152-251-152"];

  const parseDate = () => {
    return dateObj.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const placeHolderImg = () => {
    return (
      event.photoUrl ||
      `https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png`
    );
  };

  const formatTicketPrice = () => {
    const numSplit = event.ticketPrice.split(".");
    let formattedPrice;
    if (numSplit[1].length === 1) {
      formattedPrice = event.ticketPrice + "0";
    } else {
      formattedPrice = event.ticketPrice;
    }

    return formattedPrice;
  };

  const handleLikeClick = () => {
    if (!sessionUserId) history.push("/login");
    let icon = document.getElementById(`liked-event-button-icons-${event.id}`);
    if (likeStatus) {
      setLikeStatus(false);
      icon.style.color = "#39364f";
      dispatch(deleteLike(event.id));
      if (eventsObj) dispatch(unlikeEvent(event.id, sessionUserId));
    } else {
      setLikeStatus(true);
      if (icon) icon.style.color = "#d1410c";
      dispatch(createLike({ like: { event_id: event.id } }));
      if (eventsObj) dispatch(likeEvent(event.id, sessionUserId));
    }
  };

  const likeIcon = () => {
    let icon = document.getElementById(`liked-event-button-icons-${event.id}`);
    if (likeStatus) {
      if (icon) icon.style.color = "#d1410c";
      return <BsSuitHeartFill />;
    } else {
      if (icon) icon.style.color = "#39364f";
      return <BsSuitHeart id="like-icon-thickness" />;
    }
  };

  return (
    <div className="like-list-item-container">
      <div className="liked-event-info-container">
        <div className="liked-event-info">
          <NavLink to={`/events/${event.id}`}>
            <h2 className="liked-event-info-title">{event.title}</h2>
          </NavLink>
          <p className="liked-event-info-date">{parseDate()}</p>
          <p>{event.address}</p>
          <p className="liked-event-info-ticket-price">
            {"Starts at $" + formatTicketPrice()}
          </p>
        </div>
      </div>
      <div className="liked-event-right-container">
        <div className="liked-event-image">
          <NavLink to={`/events/${event.id}`}>
            <img src={placeHolderImg()} alt=""></img>
          </NavLink>
        </div>
        <div className="liked-event-like-button-container">
          <div className="liked-event-like-button-border">
            <button
              onClick={() => handleLikeClick()}
              className="liked-event-like-button"
            >
              <div id={`liked-event-button-icons-${event.id}`}>
                {likeIcon()}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedEventItem;
