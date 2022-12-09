import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, fetchEvents } from "../../store/event.js";
import EventListItem from "./EventListItem.js";

const EventIndexSection = () => {
  const dispatch = useDispatch();
  const events = useSelector(getEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const eventsList = events.map((event) => {
    return <EventListItem key={event.id} event={event} />;
  });

  return <ol>{eventsList}</ol>;
};

export default EventIndexSection;
