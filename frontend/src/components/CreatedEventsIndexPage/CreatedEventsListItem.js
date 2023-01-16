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
      `https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/main_image_star-forming_region_carina_nircam_final-1280.jpg`
    );
  };

  const handleEdit = () => {
    history.push(`/events/${event.id}/edit`);
  };

  const handleDelete = (e) => {
    // e.preventDefault();
    dispatch(deleteEvent(event.id));
  };

  if (event.id) {
    // console.log(`event ${event.id} exists`);
    const progressBar = document.getElementById(
      `progress-bar-fill-${event.id}`
    );
    if (progressBar) {
      progressBar.style.width = `${
        (event.tickets.length / event.capacity) * 100
      }%`;
      progressBar.style.backgroundColor = "#f05537";
      progressBar.style.height = "10px";
    }
  }

  return (
    <div className="event-list-item-container">
      <div className="event-list-item-info-container">
        <div className="event-list-image">
          <img src={placeHolderImg()} alt=""></img>
        </div>
        <div className="event-list-info">
          <h2>{event.title}</h2>
          <p>{event.address}</p>
          <p>{parseDate()}</p>
        </div>
      </div>

      <div className="event-list-item-tickets-container">
        <div className="event-list-item-ticket-number">
          {event.tickets.length}/{event.capacity}
        </div>
        <div className="event-list-item-progress-border">
          <div
            className="event-list-item-progress-fill"
            id={`progress-bar-fill-${event.id}`}
          ></div>
        </div>
      </div>

      <div className="event-list-item-sales-container">
        ${(event.tickets.length * event.ticketPrice).toFixed(2)}
      </div>

      <div className="event-list-item-button-container">
        <div>
          <button className="event-list-edit-button" onClick={handleEdit}>
            Edit
          </button>
        </div>
        <div>
          <button className="event-list-delete-button" onClick={handleDelete}>
            Delete
            {/* {event.id} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatedEventsListItem;
