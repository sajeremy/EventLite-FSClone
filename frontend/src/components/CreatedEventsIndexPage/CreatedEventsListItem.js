import React from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/event";
import * as sessionActions from "../../store/session";
import "./CreatedEventsIndexPage.css";

const CreatedEventsListItem = (props) => {
  const { event } = props;
  const history = useHistory();
  const dispatch = useDispatch();
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

  const parseDate = () => {
    return dateObj.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
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

  const handleEdit = () => {
    history.push(`/events/${event.id}/edit`);
  };

  const handleDelete = (e) => {
    // e.preventDefault();
    dispatch(deleteEvent(event.id));
  };

  // debugger;
  return (
    <div className="event-list-item-container">
      <div className="event-list-item-info-container">
        <NavLink to={`/events/${event.id}`}>
          <div className="event-list-image">
            <img src={placeHolderImg()} alt=""></img>
          </div>
        </NavLink>
        <div className="event-list-info">
          <h2>{event.title}</h2>
          <p>{event.address}</p>
          <p>{parseDate()}</p>
        </div>
      </div>

      <div className="event-list-item-tickets-container">O/12</div>

      <div className="event-list-item-sales-container">$200</div>

      <div className="event-list-item-button-container">
        <div>
          <button className="event-list-edit-button" onClick={handleEdit}>
            Edit
          </button>
        </div>
        <div>
          <button className="event-list-delete-button" onClick={handleDelete}>
            Delete Event {event.id}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatedEventsListItem;
