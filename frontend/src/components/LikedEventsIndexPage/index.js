import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvents,
  getSortedUpcomingEvents,
  getCreatedEvents,
  fetchEvents,
  getSortedAttendingEvents,
} from "../../store/event.js";
import { getTickets } from "../../store/ticket.js";
import { getLikedEvents } from "../../store/like.js";
import "./LikedEventsIndexPage.css";
import LikedEventItem from "./LikedEventItem.js";

const LikedEventsIndexPage = () => {
  const dispatch = useDispatch();
  // const sortedAttendingEvents = useSelector(getSortedAttendingEvents);
  const likedEvents = useSelector(getLikedEvents);
  // const sortedEventIds = likedEvents[0]
  //   ? likedEvents.map((event) => event.id)
  //   : [];
  // const purchasedTickets = useSelector(getTickets);
  // likedEvents.sort(
  //   (a, b) =>
  //     sortedEventIds.indexOf(a.eventsId) - sortedEventIds.indexOf(b.eventsId)
  // );

  // useEffect(() => {
  //   // dispatch(fetchEvents());

  // }, []);

  const likedEventsList = likedEvents.map((event) => {
    return <LikedEventItem key={event.id} event={event} />;
  });

  return (
    <>
      <div className="liked-events-container">
        <h1>Likes</h1>
        <ul className="ul-liked-event-list">{likedEventsList}</ul>
      </div>
    </>
  );
};

export default LikedEventsIndexPage;
