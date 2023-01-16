import React from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "../../store/event";
import * as sessionActions from "../../store/session";
import "./PurchasedTicketsIndexPage.css";

const PurchasedTicketListItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { ticket } = props;
  const event = useSelector(getEvent(ticket.eventsId));
  if (!event) {
    return null;
  }
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
  const colors = ["240-128-128", "255-165-0", "224-255-255", "152-251-152"];

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
      `https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png`
    );
  };

  return (
    <div className="ticket-list-item-container">
      <div className="ticket-item-info-container">
        <NavLink to={`/events/${event.id}`}>
          <div className="ticket-list-image">
            <img src={placeHolderImg()} alt=""></img>
          </div>
        </NavLink>
        <div className="ticket-list-info">
          <NavLink to={`/events/${event.id}`}>
            <h2>{event.title}</h2>
          </NavLink>
          <p>{event.address}</p>
          <p>{parseDate()}</p>
        </div>
      </div>

      {/* <div className="event-list-item-tickets-container">
        <div className="event-list-item-ticket-number">4/12</div>
        <div className="event-list-item-progress-border">
          <div className="event-list-item-progress-fill"></div>
        </div>
      </div> */}

      <div className="event-list-item-sales-container">{ticket.id}</div>

      <div className="event-list-item-button-container">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=https://www.linkedin.com/in/jeremy-santiago-11b05367&amp;size=100x100`}
          alt=""
          title=""
        />
      </div>
    </div>
  );
};

export default PurchasedTicketListItem;
