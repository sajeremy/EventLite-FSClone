import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getCreatedEvents, fetchEvents } from "../../store/event.js";
import "./CreatedEventsIndexPage.css";
import CreatedEventsListItem from "./CreatedEventsListItem.js";

const CreatedEventsIndexPage = () => {
  const dispatch = useDispatch();
  // const events = useSelector(getEvents);
  // const sessionUser = useSelector((state) => state.session.user);
  // const organizedEvents = events.filter(
  //   (event) => event.organizerId === sessionUser.id
  // );
  const organizedEvents = useSelector(getCreatedEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const createdEventsList = organizedEvents.map((event) => {
    return <CreatedEventsListItem key={event.id} event={event} />;
  });

  return (
    <>
      <div className="created-events-container">
        <div className="created-events-list-header">
          <div className="header-event-col">
            <span>Event</span>
          </div>
          <div className="header-ticket-col">
            <span>Sold</span>
          </div>
          <div className="header-sales-col">
            <span>Gross</span>
          </div>
        </div>
        <ul className="ul-event-list">{createdEventsList}</ul>
      </div>
    </>
  );
};

export default CreatedEventsIndexPage;
