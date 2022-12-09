import React from "react";

const EventListItem = (props) => {
  const { event } = props;

  return (
    <li>
      <div>{event.title}</div>
      <div>{event.body}</div>
      <div>{event.address}</div>
      <div>{event.category}</div>
    </li>
  );
};

export default EventListItem;
