import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/event";
import * as sessionActions from "../../store/session";
import "./CreatedEventsIndexPage.css";

const CreatedEventsListItem = (props) => {
  const { event } = props;
  const history = useHistory();
  const dispatch = useDispatch();

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
      <div className="event-list-item-info-container"></div>

      <div className="event-list-item-tickets-container"></div>

      <div className="event-list-item-sales-container"></div>

      <div className="event-list-item-button-container">
        <button className="event-list-edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="event-list-delete-button" onClick={handleDelete}>
          Delete Event {event.id}
        </button>
      </div>
    </div>
  );
};

export default CreatedEventsListItem;
