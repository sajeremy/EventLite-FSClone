import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvent, getEvent } from "../../store/event";

const EventShowPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [eventId, dispatch]);

  const event = useSelector(getEvent(eventId));
  if (!event) {
    return null;
  }

  return (
    <>
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
    </>
  );
};

export default EventShowPage;
