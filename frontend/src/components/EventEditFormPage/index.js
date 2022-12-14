import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchEvent, getEvent } from "../../store/event.js";
// import { createFormEvent } from "../../store/event";
import csrfFetch from "../../store/csrf";
import { BiChevronLeft } from "react-icons/bi";
import "./EventEditFormPage.css";

const EventEditFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const organizerId = useSelector((state) => state.session.user.id);
  const currEvent = useSelector(getEvent(eventId));
  // debugger;
  const [title, setTitle] = useState(currEvent.title);
  const [category, setCategory] = useState(currEvent.category);
  const [address, setAddress] = useState(currEvent.address);
  const [startDatetime, setStartDatetime] = useState(currEvent.startDatetime);
  const [endDatetime, setEndDatetime] = useState(currEvent.endDatetime);
  const [body, setBody] = useState(currEvent.body);
  const [capacity, setCapacity] = useState(currEvent.capacity);
  const [ticketPrice, setTicketPrice] = useState(currEvent.ticketPrice);
  const [photoUrl, setPhotoUrl] = useState(currEvent.photoUrl);
  const [errors, setErrors] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  // debugger;
  // const [event, setEvent] = useState(eventId ? currEvent : {});
  // const [event, setEvent] = useState(currEvent);
  // debugger;

  const updateFormEvent = (formData) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`, {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      history.push("/");
    }
  };

  useEffect(() => {
    const fetchFormData = async () => {
      // let fetchedEvent = await fetchEvent(eventId);
      // // delete fetchEvent.event.photoUrl;
      // await setEvent({ ...fetchedEvent.event, photoUrl: undefined });
      let fetchedEvent = dispatch(fetchEvent(eventId));
      // delete fetchEvent.event.photoUrl;
      setPhotoUrl(undefined);
    };
    fetchFormData();
  }, []);
  // if (!currEvent) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // setLoading(true);
    // debugger;
    const formData = new FormData();
    formData.append("event[title]", title);
    formData.append("event[category]", category);
    formData.append("event[address]", address);
    formData.append("event[start_datetime]", startDatetime);
    formData.append("event[end_datetime]", endDatetime);
    formData.append("event[body]", body);
    formData.append("event[capacity]", capacity);
    formData.append("event[ticket_price]", ticketPrice);

    if (photoFile) {
      formData.append("event[photo]", photoFile);
    }
    // debugger;
    dispatch(updateFormEvent(formData)).catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        // debugger;
        data = await res.text(); // Will hit this case if the server is down
      }
      // debugger;
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
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
  const formatedDate = (dateTimeStr) => {
    const dateTimeObj = new Date(dateTimeStr);
    const yr = dateTimeObj.getFullYear();
    const mo = dateTimeObj.getMonth();
    const day = dateTimeObj.getDate();
    const time = dateTimeObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    let newMo;
    if (mo + 1 < 10) {
      newMo = `0${mo}`;
    } else {
      newMo = mo;
    }
    //Too many re-renders error
    // setEvent({ ...event, startDatetime: `${yr}-${newMo}-${day}T${time}` });
    // setEndDatetime(`${yr}-${mo}-${day}T${time}`);
    // setEndDatetime(`${yr}-${mo}-${day}T${time}`);
    // debugger;
    return `${yr}-${mo}-${day}T${time}`;
  };
  const handleStartDatetime = () => {
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
  const handleEndDatetime = () => {
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
  const handleBody = () => {
    let result;
    const elem = document.getElementById("create-event-body-input");
    if (errors.includes("Can't be blank")) {
      result = "Must include a description";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };
  const handleCapacity = () => {
    let result;
    const elem = document.getElementById("create-event-capacity-input");
    if (errors.includes("Can't be blank")) {
      result = "Must enter capacity";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };
  const handleTicketPrice = () => {
    let result;
    const elem = document.getElementById("create-event-ticket-price-input");
    if (errors.includes("Can't be blank")) {
      result = "Must enter ticket price";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };
  if (!currEvent) {
    return null;
  }

  // const handleFile = (e) => {
  //   const file = e.currentTarget.files[0];
  //   setPhotoFile(file);
  // };
  // const handleFile = (e) => {
  //   const file = e.currentTarget.files[0];
  //   setEventPhoto(file);

  // console.log(eventPhoto);
  // debugger;
  return (
    <>
      {currEvent && (
        <div className="event-form-container">
          <div className="created-events-index-button-container">
            <NavLink
              className="created-events-index-button"
              to={`/users/${organizerId}/events`}
            >
              <div className="created-events-index-button-icon">
                <BiChevronLeft className="created-events-index-button-icon" />
              </div>
              <p className="created-events-index-button-text">Events</p>
            </NavLink>
          </div>
          <div className="create-event-form-container">
            <h1>{title}</h1>
            <form className="create-event-form" onSubmit={handleSubmit}>
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
              <div className="basic-info-section">
                <div className="basic-info-header-container">
                  <h1>Basic Info</h1>
                  <p>
                    Name your event and tell event-goers why they should come.
                    Add details that highlight what makes it unique.
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
                    defaultValue={category}
                    className="create-event-input"
                    id="create-event-category-input"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Category" disabled>
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
                    Help people in the area discover your event and let
                    attendees know where to show up.
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
                    <label>Event Starts {formatedDate(startDatetime)}</label>
                  </div>
                  <input
                    id="create-event-start-datetime-input"
                    type="datetime-local"
                    // value={event.startDatetime}
                    value="2022-09-15T11:51"
                    onChange={(e) => setStartDatetime(e.target.value)}
                  />
                  <div className="create-event-error-handling-text">
                    {handleStartDatetime()}
                  </div>
                </div>
                <div className="end-date-time-container">
                  <div>
                    <label>Event Ends {formatedDate(endDatetime)}</label>
                  </div>
                  <input
                    id="create-event-end-datetime-input"
                    type="datetime-local"
                    // value={event.endDatetime}
                    value="2022-12-28T10:10"
                    onChange={(e) => setEndDatetime(e.target.value)}
                  />
                  <div className="create-event-error-handling-text">
                    {handleEndDatetime()}
                  </div>
                </div>
              </div>
              <div className="body-section">
                <div className="body-header-container">
                  <h1>Description</h1>
                  <p>
                    Grab people's attention with a description about your event.
                    Add more details to your event like your schedule, sponsors,
                    or featured guests
                  </p>
                </div>
                <div className="body-input-container">
                  <textarea
                    className="create-event-input"
                    id="create-event-body-input"
                    rows="5"
                    cols="50"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                  <div className="create-event-error-handling-text">
                    {handleBody()}
                  </div>
                </div>
              </div>
              <div className="image-section">
                <div className="image-header-container">
                  <h1>Main Event Image</h1>
                  <p>
                    This is the first image attendees will see at the top of
                    your listing.
                  </p>
                </div>
                <div className="image-input-container">
                  <input
                    type="file"
                    className="create-event-input"
                    id="create-event-image-input"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  ></input>
                  {/* <div className="create-event-error-handling-text">
                {handleImage()}
              </div> */}
                </div>
              </div>
              <div className="ticket-section">
                <div className="image-header-container">
                  <h1>Tickets</h1>
                </div>
                <div className="ticket-input-container">
                  <div>
                    <label>Capacity</label>
                  </div>
                  <input
                    className="create-event-input"
                    id="create-event-capacity-input"
                    type="number"
                    placeholder="(i.e. 1, 10, 100)"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                  <div className="create-event-error-handling-text">
                    {handleCapacity()}
                  </div>
                  <div>
                    <label>Ticket Price</label>
                  </div>
                  <input
                    className="create-event-input"
                    id="create-event-ticket-price-input"
                    type="number"
                    placeholder="(i.e. 0, 2.50, 30.99)"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                  />
                  <div className="create-event-error-handling-text">
                    {handleTicketPrice()}
                  </div>
                </div>
              </div>
              <button type="submit">Update Event</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EventEditFormPage;