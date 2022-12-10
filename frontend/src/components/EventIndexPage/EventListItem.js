import React from "react";
import { NavLink } from "react-router-dom";

const EventListItem = (props) => {
  const { event } = props;
  const startDate = event.startDatetime;
  const dateObj = new Date(startDate);
  const nowObj = new Date();
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

  const tomorrowObj = () => {
    const tomorrowDate = new Date(Number(nowObj));
    tomorrowDate.setDate(nowObj.getDate() + 1);
    return tomorrowDate;
  };

  const parseDate = () => {
    let parsedDateObj;

    if (
      dateObj.getFullYear() === nowObj.getFullYear() &&
      dateObj.getMonth() === nowObj.getMonth()
    ) {
      if (dateObj.getDate() === nowObj.getDate()) {
        parsedDateObj =
          "Today at " +
          dateObj.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
      } else if (dateObj.getDate() === tomorrowObj().getDate()) {
        parsedDateObj =
          "Tomorrow at " +
          dateObj.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
      }
    } else {
      parsedDateObj = dateObj.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
    return parsedDateObj;
  };

  return (
    <div>
      <NavLink to={`/events/${event.id}`}>
        <img src={event.photoUrl} alt=""></img>
        <div>
          <strong>{event.title}</strong>
        </div>
        <div>
          <strong>{parseDate()}</strong>
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
    </div>
  );
};

export default EventListItem;
