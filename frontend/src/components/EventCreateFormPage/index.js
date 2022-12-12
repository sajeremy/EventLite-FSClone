import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { createEvent } from "../../store/event";
import "./EventCreateFormPage.css";

const EventCreateFormPage = () => {
  const dispatch = useDispatch();
  const organizerId = useSelector((state) =>
    state.session ? state.session.id : null
  );
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventPhoto, setEventPhoto] = useState("");
  const [body, setBody] = useState("");
  // const [organizerName, setOrganizerName] = useState("");
  // const [city, setCity] = useState("");
  // const [usState, setUsState] = useState("");
  const [errors, setErrors] = useState([]);
  // if (!organizerId) return <Redirect to="/login" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      createEvent({
        title,
        body,
        category,
        address,
        // startDatetime,
        // endDatetime,
      })
    ).catch(async (res) => {
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
    });

    // return setErrors(["Emails must match"]);
  };

  // const handleEmail = () => {
  //   let result;
  //   const elem = document.getElementById("email-input");
  //   if (errors.includes("Email address must be valid")) {
  //     result = "Email address must be valid";
  //     elem.style = "border-color:#c5162e";
  //     return result;
  //   } else {
  //     if (elem) {
  //       elem.style = "border-color:rgb(238, 237, 242)";
  //     }
  //   }
  // };
  // const handleConfirmEmail = () => {
  //   let result;
  //   const elem = document.getElementById("confirm-email-input");
  //   if (errors.includes("Emails must match")) {
  //     result = "Emails must match";
  //     elem.style = "border-color:#c5162e";
  //     return result;
  //   } else {
  //     if (elem) {
  //       elem.style = "border-color:rgb(238, 237, 242)";
  //     }
  //   }
  // };
  // const handleFirstName = () => {
  //   let result;
  //   const elem = document.getElementById("first-name-input");
  //   if (errors.includes("First name can't be blank")) {
  //     result = "First name can't be blank";
  //     elem.style = "border-color:#c5162e";
  //     return result;
  //   } else {
  //     if (elem) {
  //       elem.style = "border-color:rgb(238, 237, 242)";
  //     }
  //   }
  // };
  // const handleLastName = () => {
  //   let result;
  //   const elem = document.getElementById("last-name-input");
  //   if (errors.includes("Last name can't be blank")) {
  //     result = "Surname can't be blank";
  //     elem.style = "border-color:#c5162e";
  //     return result;
  //   } else {
  //     if (elem) {
  //       elem.style = "border-color:rgb(238, 237, 242)";
  //     }
  //   }
  // };
  // const handlePassword = () => {
  //   let result;
  //   const elem = document.getElementById("password-input");
  //   if (
  //     errors.includes("Password is too short (minimum is 8 characters)") ||
  //     errors.includes("Password can't be blank")
  //   ) {
  //     password.length === 0
  //       ? (result = "Password can't be blank")
  //       : (result = "Password is too short (minimum is 8 characters)");
  //     elem.style = "border-color:#c5162e";
  //     return result;
  //   } else {
  //     if (elem) {
  //       elem.style = "border-color:rgb(238, 237, 242)";
  //     }
  //   }
  // };

  // return (
  //   <>
  //     <div className="container">
  //       <div className="left-container">
  //         <div className="signup-header">
  //           <NavLink to={"/"}>
  //             <span className="logo">eventlite</span>
  //           </NavLink>
  //           <h1>Create an account</h1>
  //         </div>
  //         <form onSubmit={handleSubmit}>
  //           <div className="email-container">
  //             <div>
  //               <label>Email address</label>
  //             </div>

  //             <input
  //               className="signup-input"
  //               id="email-input"
  //               type="text"
  //               placeholder="email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               // required
  //             />
  //             <div className="error-handling-text">{handleEmail()}</div>
  //           </div>

  //           <br></br>

  //           <div className="confirm-email-container">
  //             <div>
  //               <label>Confirm email</label>
  //             </div>
  //             <input
  //               className="signup-input"
  //               id="confirm-email-input"
  //               type="text"
  //               placeholder="Confirm email"
  //               value={confirmEmail}
  //               onChange={(e) => setConfirmEmail(e.target.value)}
  //               // onFocus={focusConfirmEmail}
  //               // required
  //             />
  //             <div className="error-handling-text">{handleConfirmEmail()}</div>
  //           </div>

  //           <br></br>

  //           {/* <ul>
  //             {errors.map((error) => (
  //               <li key={error}>{error}</li>
  //             ))}
  //           </ul> */}

  //           <div className="full-name-line">
  //             <div className="first-name-container">
  //               <div>
  //                 <label>First Name</label>
  //               </div>
  //               <input
  //                 className="signup-input"
  //                 id="first-name-input"
  //                 type="text"
  //                 placeholder="First Name"
  //                 value={first_name}
  //                 onChange={(e) => setFirst_name(e.target.value)}
  //                 // required
  //               />
  //               <div className="error-handling-text">{handleFirstName()}</div>
  //             </div>

  //             <div className="last-name-container">
  //               <div>
  //                 <label>Surname</label>
  //               </div>
  //               <input
  //                 className="signup-input"
  //                 id="last-name-input"
  //                 type="text"
  //                 placeholder="Surname"
  //                 value={last_name}
  //                 onChange={(e) => setLast_name(e.target.value)}
  //                 // required
  //               />
  //               <div className="error-handling-text">{handleLastName()}</div>
  //             </div>
  //           </div>

  //           <br></br>

  //           <div className="password-container">
  //             <div>
  //               <label>Password</label>
  //             </div>
  //             <input
  //               className="signup-input"
  //               id="password-input"
  //               type="password"
  //               placeholder="Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               // required
  //             />
  //             <div className="error-handling-text">{handlePassword()}</div>
  //           </div>

  //           <div className="rail"></div>
  //           <div className="password-text">
  //             <span>Your password must be at least 8 characters</span>
  //           </div>

  //           <br></br>

  //           <button type="submit" className="create-account-button">
  //             Create account
  //           </button>
  //         </form>

  //         <div className="login-link-container">
  //           <NavLink to={"/login"}>
  //             <span className="login-link">Login</span>
  //           </NavLink>
  //         </div>
  //       </div>

  //       <div className="right-container">
  //         <img
  //           src="https://eventlite-22-seeds.s3.amazonaws.com/signupForm.jpg"
  //           alt=""
  //         ></img>
  //         <div className="img-text-container">
  //           <div className="top-img-text-container">SalsaMania Social</div>
  //           <div className="bottom-img-test-container">New York, NY</div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default EventCreateFormPage;
