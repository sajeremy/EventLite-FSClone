import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { createLike, deleteLike, fetchUserLikes } from "../../store/like";
import { likeEvent, unlikeEvent } from "../../store/event";

const EventListItem = (props) => {
  const { event } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const likesArr = useSelector((state) => (state.likes ? state.likes : []));
  const [likeStatus, setLikeStatus] = useState(
    likesArr.includes(event.id) ? true : false
  );
  const startDate = event.startDatetime;
  const dateObj = new Date(startDate);
  const nowObj = new Date();
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
  const sessionUserId = useSelector((state) =>
    state.session.user ? state.session.user.id : null
  );
  const eventsObj = useSelector((state) =>
    state.events ? state.events : null
  );

  const tomorrowObj = () => {
    const tomorrowDate = new Date(Number(nowObj));
    tomorrowDate.setDate(nowObj.getDate() + 1);
    return tomorrowDate;
  };

  const parseDate = () => {
    let parsedDateObj;

    if (
      dateObj.getFullYear() === nowObj.getFullYear() &&
      dateObj.getMonth() === nowObj.getMonth()
    ) {
      if (dateObj.getDate() === nowObj.getDate()) {
        parsedDateObj =
          "Today at " +
          dateObj.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
      } else if (dateObj.getDate() === tomorrowObj().getDate()) {
        parsedDateObj =
          "Tomorrow at " +
          dateObj.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
      }
    } else {
      parsedDateObj = dateObj.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
    return parsedDateObj;
  };

  const formatTicketPrice = () => {
    // debugger;
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
    let icon = document.getElementById(
      `event-card-like-button-icons-${event.id}`
    );
    if (likeStatus) {
      setLikeStatus(false);
      icon.style.color = "#39364f";
      dispatch(deleteLike(event.id));
      if (eventsObj) dispatch(unlikeEvent(event.id, sessionUserId));
    } else {
      setLikeStatus(true);
      if (icon) icon.style.color = "#d1410c";
      dispatch(createLike({ like: { event_id: event.id } }));
      //Determine if this works or to refetch all events as an alternative
      if (eventsObj) dispatch(likeEvent(event.id, sessionUserId));
    }
  };

  const likeIcon = () => {
    let icon = document.getElementById(
      `event-card-like-button-icons-${event.id}`
    );
    if (likeStatus) {
      if (icon) icon.style.color = "#d1410c";
      return <BsSuitHeartFill />;
    } else {
      if (icon) icon.style.color = "#39364f";
      return <BsSuitHeart id="like-icon-thickness" />;
    }
  };

  return (
    <div className="event-card-container-outer-edge">
      <div className="event-card-container">
        <div className="event-card-img-container">
          <NavLink to={`/events/${event.id}`}>
            <img src={event.photoUrl} alt=""></img>
          </NavLink>
        </div>
        <div className="event-card-info-container">
          <NavLink
            className="event-card-info-title-link"
            to={`/events/${event.id}`}
          >
            <h3 className="event-card-info-title">{event.title}</h3>
          </NavLink>
          <p className="event-card-info-date">{parseDate()}</p>
          <p className="event-card-info-address">
            {event.address.slice(0, 19) + "..."}
          </p>
          <p className="event-card-info-ticket">
            {"Starts at $" + formatTicketPrice()}
          </p>
          <div className="event-card-info-organizer-likes">
            <p>
              {"Organized by " +
                event.organizerFirstName +
                " " +
                event.organizerLastName}
            </p>
            <p>{event.likes.length} Likes</p>
          </div>
          <div className="event-card-like-button-container">
            <button
              onClick={() => handleLikeClick()}
              className="event-card-like-button"
            >
              <div id={`event-card-like-button-icons-${event.id}`}>
                {likeIcon()}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListItem;
