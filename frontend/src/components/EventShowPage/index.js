import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvent, getEvent } from "../../store/event";
import "./EventShowPage.css";
import { BsSuitHeart, BsSuitHeartFill, BsClockHistory } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { AiTwotoneCalendar } from "react-icons/ai";

const EventShowPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const [likeStatus, setLikeStatus] = useState(false);
  let startDateObj, endDateObj;

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [eventId, dispatch]);

  const event = useSelector(getEvent(eventId));

  if (!event) {
    return null;
  }

  startDateObj = new Date(event.startDatetime);
  endDateObj = new Date(event.endDatetime);

  const timeDuration = () => {
    const timeLength = (endDateObj.getTime() - startDateObj.getTime()) / 1000;
    if (timeLength > 86400) {
      let numDays = Math.floor(timeLength / 86400);
      return `${numDays} Days`;
    } else {
      let numHours = Math.floor(timeLength / 3600);
      let numMinutes = (timeLength % 3600) / 60;

      if (numMinutes === 0) {
        return `${numHours} Hours`;
      } else {
        return `${numHours} Hours and ${numMinutes} Minutes`;
      }
    }
  };

  const fullDateDuration = () => {
    const parsedStartDateObj = startDateObj.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const parsedEndDateObj = endDateObj.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return parsedStartDateObj + " - " + parsedEndDateObj;
  };

  const startDateString = startDateObj.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  const renderBlurImg = async () => {
    await event;
    const blurredImage = document.getElementById("show-page-blurred-img");
    blurredImage.style.backgroundImage = `url(${event.photoUrl})`;
  };
  renderBlurImg();

  const handleLikeClick = () => {
    let icon = document.getElementById(`show-page-like-icon-${event.id}`);
    if (likeStatus) {
      setLikeStatus(false);
      icon.style.color = "#39364f";
    } else {
      setLikeStatus(true);
      if (icon) {
        icon.style.color = "#d1410c";
      }
    }
  };

  const likeIcon = () => {
    if (likeStatus) {
      return <BsSuitHeartFill />;
    } else {
      return <BsSuitHeart id="like-icon-thickness" />;
    }
  };

  const formatTicketPrice = () => {
    const numSplit = event.ticketPrice.split(".");
    let formattedPrice;
    if (numSplit[1].length === 1) {
      formattedPrice = event.ticketPrice + "0";
    } else {
      formattedPrice = event.ticketPrice;
    }

    return formattedPrice;
  };

  const handleTickets = () => {
    alert(`Redirect to ticket modal for Event ${event.id}`);
  };

  return (
    <>
      <div className="show-page-img-banner-container">
        <div id="border-show-page-blurred-img"></div>
        <div id="hide-overflow">
          <div id="show-page-blurred-img"></div>
        </div>
        <img className="img-test" src={event.photoUrl} alt=""></img>
      </div>

      <div className="show-page-details-container">
        <div className="show-page-details-left">
          <div className="show-page-start-date">
            <p>{startDateString}</p>
          </div>
          <div className="show-page-title">
            <h1>{event.title}</h1>
          </div>
          <div className="show-page-organizer-likes-container">
            <div className="show-page-organizer">
              <p>
                {"Organized by " +
                  event.organizerFirstName +
                  " " +
                  event.organizerLastName}
              </p>
            </div>
            <div className="show-page-likes">
              <p className="show-page-likes-text"># likes</p>
              <button
                onClick={() => handleLikeClick()}
                className="show-page-likes-button"
              >
                <div id={`show-page-like-icon-${event.id}`}>{likeIcon()}</div>
              </button>
            </div>
          </div>
          <div className="show-page-where-and-where-container"></div>
          <div className="show-page-when-and-where-header">
            <h2>When and where</h2>
          </div>
          <div className="show-page-where-and-where-details">
            <div className="show-page-date-container">
              <div className="show-page-calendar-icon">
                <AiTwotoneCalendar />
              </div>
              <div className="show-page-date-text">
                <h3>Date and time</h3>
                <p>{fullDateDuration()}</p>
              </div>
            </div>
            <div className="show-page-location-container">
              <div className="show-page-location-icon">
                <FiMapPin />
              </div>
              <div className="show-page-location-text">
                <h3>Location</h3>
                <p>{event.address}</p>
              </div>
            </div>
          </div>
          <div className="show-page-about-event-container">
            <div className="show-page-about-event-header">
              <h2>About this event</h2>
            </div>
            <div className="show-page-time-duration">
              <div className="show-page-duration-icon">
                <BsClockHistory />
              </div>
              <div>{timeDuration()}</div>
            </div>
            <div className="show-page-event-description">
              <p>{event.body}</p>
            </div>
          </div>
        </div>
        <div className="show-page-details-right">
          <div className="show-page-ticket-container">
            <div className="show-page-ticket-price">
              <p>{"From $" + formatTicketPrice()}</p>
            </div>
            <button
              className="show-page-ticket-button"
              onClick={() => handleTickets()}
            >
              Get Tickets
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventShowPage;
