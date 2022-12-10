import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, fetchEvents } from "../../store/event.js";
import EventListItem from "./EventListItem.js";
import EventCategories from "./EventCategories";

const EventIndexPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(getEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const eventsList = events.map((event) => {
    return <EventListItem key={event.id} event={event} />;
  });

  return (
    <>
      <section className="event-index-layout">
        <div className="index-layout-border">
          <EventCategories />
          <ol>{eventsList}</ol>
        </div>
      </section>
    </>
  );
};

export default EventIndexPage;
