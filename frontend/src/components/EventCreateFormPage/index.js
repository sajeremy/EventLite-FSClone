import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { createEvent } from "../../store/event";
import { BiChevronLeft } from "react-icons/bi";
import "./EventCreateFormPage.css";

const EventCreateFormPage = () => {
  const dispatch = useDispatch();
  const organizerId = useSelector((state) =>
    state.session ? state.session.id : null
  );
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [eventPhoto, setEventPhoto] = useState("");
  const [body, setBody] = useState("");
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  // const [organizerName, setOrganizerName] = useState("");
  // const [city, setCity] = useState("");
  // const [usState, setUsState] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      createEvent({
        title,
        body,
        category,
        address,
        startDateTime,
        endDateTime,
      })
    ).catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });

    // return setErrors(["Emails must match"]);
  };
  const handleTitle = () => {
    let result;
    const elem = document.getElementById("create-event-title-input");
    if (errors.includes("Title is required.")) {
      result = "Must include a title";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };
  const handleCategory = () => {
    let result;
    const elem = document.getElementById("create-event-category-input");
    if (errors.includes("Category is required.")) {
      result = "Category is required.";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };
  const handleAddress = () => {
    let result;
    const elem = document.getElementById("create-event-address-input");
    if (errors.includes("Must include address.")) {
      result = "Venue Location is required.";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };
  const handleStartDateTime = () => {
    let result;
    const elem = document.getElementById("create-event-start-datetime-input");
    if (errors.includes("Can't be blank")) {
      result = "Must include start date and time.";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };
  const handleEndDateTime = () => {
    let result;
    const elem = document.getElementById("create-event-end-datetime-input");
    if (errors.includes("Can't be blank")) {
      result = "Must include end date and time.";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };

  return (
    <div className="event-form-container">
      <div className="created-events-index-button-container">
        <button className="created-events-index-button">
          <div className="created-events-index-button-icon">
            <BiChevronLeft className="created-events-index-button-icon" />
          </div>
          <p className="created-events-index-button-text">Events</p>
        </button>
      </div>
      <div className="create-event-form-container">
        <form className="create-event-form" onSubmit={handleSubmit}>
          <div className="basic-info-section">
            <div className="basic-info-header-container">
              <h1>Basic Info</h1>
              <p>
                Name your event and tell event-goers why they should come. Add
                details that highlight what makes it unique.
              </p>
            </div>
            <div className="title-container">
              <div>
                <label>Event Title</label>
              </div>
              <input
                className="create-event-input"
                id="create-event-title-input"
                type="text"
                placeholder="Be clear and descriptive"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="create-event-error-handling-text">
                {handleTitle()}
              </div>
            </div>
            <div className="category-container">
              <select
                className="create-event-input"
                id="create-event-category-input"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Category" selected="true" disabled>
                  Category
                </option>
                <option value="Music">Music</option>
                <option value="Performing & Visual Arts">
                  Performing & Visual Arts
                </option>
                <option value="Holiday">Holiday</option>
                <option value="Health">Health</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Business">Business</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Other">Other</option>
              </select>
              <div className="create-event-error-handling-text">
                {handleCategory()}
              </div>
            </div>
          </div>
          <div className="location-section">
            <div className="location-header-container">
              <h1>Location</h1>
              <p>
                Help people in the area discover your event and let attendees
                know where to show up.
              </p>
            </div>
            <div className="location-container">
              <div>
                <label>Venue Location</label>
              </div>
              <input
                className="create-event-input"
                id="create-event-address-input"
                type="text"
                placeholder="Specify address for event."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="create-event-error-handling-text">
                {handleAddress()}
              </div>
            </div>
          </div>
          <div className="date-time-section">
            <div className="date-time-header-container">
              <h1>Date and time</h1>
              <p>
                Tell event-goers when your event starts and ends so they can
                make plans to attend.
              </p>
            </div>
            <div className="start-date-time-container">
              <div>
                <label>Event Starts</label>
              </div>
              <input
                id="create-event-start-datetime-input"
                type="datetime-local"
                // placeholder="Specify address for event."
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
              />
              <div className="create-event-error-handling-text">
                {handleStartDateTime()}
              </div>
            </div>
            <div className="end-date-time-container">
              <div>
                <label>Event Ends</label>
              </div>
              <input
                id="create-event-end-datetime-input"
                type="datetime-local"
                // placeholder="Specify address for event."
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
              />
              <div className="create-event-error-handling-text">
                {handleEndDateTime()}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreateFormPage;
