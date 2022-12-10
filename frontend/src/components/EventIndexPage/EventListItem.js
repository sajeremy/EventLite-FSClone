import React from "react";
import { NavLink } from "react-router-dom";

const EventListItem = (props) => {
  const { event } = props;

  return (
    <li>
      <NavLink to={`/events/${event.id}`}>
        <img src={event.photoUrl} alt=""></img>
        <div>
          <strong>Title:</strong> {event.title}
        </div>
        <div>
          <strong>Body:</strong> {event.body}
        </div>
        <div>
          <strong>Address:</strong> {event.address}
        </div>
        <div>
          <strong>Category: </strong>
          {event.category}
        </div>
      </NavLink>
    </li>
  );
};

export default EventListItem;
