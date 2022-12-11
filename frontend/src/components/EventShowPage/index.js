import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvent, getEvent } from "../../store/event";
import "./EventShowPage.css";
import { FaRulerCombined } from "react-icons/fa";

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

  const renderBlurImg = async () => {
    await event;
    const blurredImage = document.getElementById("show-page-blurred-img");
    blurredImage.style.backgroundImage = `url(${event.photoUrl})`;
  };
  renderBlurImg();

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
        <div className="show-page-title">
          <h1>{event.title}</h1>
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
      </div>
    </>
  );
};

export default EventShowPage;
