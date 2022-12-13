import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { createFormEvent } from "../../store/event";
// import csrfFetch from "../../store/csrf";
import { BiChevronLeft } from "react-icons/bi";
import "./EventCreateFormPage.css";

const EventCreateFormPage = () => {
  const dispatch = useDispatch();
  // const organizerId = useSelector((state) =>
  //   state.session ? state.session.id : null
  // );
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [startDatetime, setstartDatetime] = useState("");
  const [endDatetime, setendDatetime] = useState("");
  const [body, setBody] = useState("");
  const [capacity, setCapacity] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [errors, setErrors] = useState([]);

  // const [uploaded, setUploaded] = useState("");
  // const [redirect, setRedirect] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  // const [photoUrl, setPhotoUrl] = useState(null);

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    setPhotoFile(file);

    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   setPhotoUrl(reader.result);
    // });
    // reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // setLoading(true);

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

    return dispatch(createFormEvent(formData, setPhotoFile)).catch(
      async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
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
  // const handleFile = (e) => {
  //   const file = e.currentTarget.files[0];
  //   setEventPhoto(file);

  // console.log(eventPhoto);
  console.log(photoFile);
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
                defaultValue={"Category"}
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
                value={startDatetime}
                onChange={(e) => setstartDatetime(e.target.value)}
              />
              <div className="create-event-error-handling-text">
                {handleStartDatetime()}
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
                value={endDatetime}
                onChange={(e) => setendDatetime(e.target.value)}
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
                Grab people's attention with a description about your event. Add
                more details to your event like your schedule, sponsors, or
                featured guests
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
                This is the first image attendees will see at the top of your
                listing.
              </p>
            </div>
            <div className="image-input-container">
              <input
                type="file"
                className="create-event-input"
                id="create-event-image-input"
                onChange={handleFile}
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
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default EventCreateFormPage;
