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
import "./PurchasedTicketsIndexPage.css";
import PurchasedTicketListItem from "./PurchasedTicketListItem.js.js";

const PurchasedTicketsIndexPage = () => {
  const dispatch = useDispatch();
  // const events = useSelector(getEvents);
  // const sessionUser = useSelector((state) => state.session.user);
  // const organizedEvents = events.filter(
  //   (event) => event.organizerId === sessionUser.id
  // );

  const sortedAttendingEvents = useSelector(getSortedAttendingEvents);
  const sortedEventIds = sortedAttendingEvents[0]
    ? sortedAttendingEvents.map((event) => event.id)
    : [];
  const purchasedTickets = useSelector(getTickets);
  purchasedTickets.sort(
    (a, b) =>
      sortedEventIds.indexOf(a.eventsId) - sortedEventIds.indexOf(b.eventsId)
  );

  // useEffect(() => {
  //   // dispatch(fetchEvents());

  // }, []);

  const purchasedTicketsList = purchasedTickets.map((ticket) => {
    return <PurchasedTicketListItem key={ticket.id} ticket={ticket} />;
  });

  return (
    <>
      <div className="purchased-tickets-container">
        <h1>Tickets</h1>
        <div className="purchased-tickets-list-header">
          <div className="header-ticket-event-col">
            <span>Events</span>
          </div>
          <div className="header-ticket-id-col">
            <span>Ticket ID</span>
          </div>
          <div className="header-ticket-qr-code-col">
            <span>QR Code</span>
          </div>
        </div>
        <ul className="ul-ticket-list">{purchasedTicketsList}</ul>
      </div>
    </>
  );
};

export default PurchasedTicketsIndexPage;
