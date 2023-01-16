// frontend/src/components/LoginFormPage/index.js

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const demoEmail = "demo@io.com".split("");
  const demoPassword = "password".split("");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // debugger;
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        let data;
        try {
          // debugger;
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          //debugger;
          data = await res.text(); // Will hit this case if the server is down
        }
        // debugger;
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  const handleEmail = () => {
    let result;
    const elem = document.getElementById("login-email-input");
    if (errors.includes("Not a valid email address.")) {
      result = "Email address must be valid";
      elem.style = "border-color:#c5162e";
      return result;
    } else if (
      errors.includes("There is no account associated with that email.")
    ) {
      result = "There is no account associated with that email";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
        // elem.style = "background-color:#E8F0FE";
      }
    }
  };

  const handlePassword = () => {
    let result;
    const elem = document.getElementById("login-password-input");
    if (errors.includes("Password is not correct")) {
      result = "Password is not correct";
      elem.style = "border-color:#c5162e";
      return result;
    } else {
      if (elem) {
        elem.style = "border-color:rgb(238, 237, 242)";
      }
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    document.getElementById("login-email-input").style =
      "border-color:rgb(238, 237, 242)";
    document.getElementById("login-password-input").style =
      "border-color:rgb(238, 237, 242)";
    setTimeout(typeEmail, 50);
    setTimeout(typePassword, 1000);
    setTimeout(loginDemoUser, 1500);
  };

  const typeEmail = () => {
    demoEmail.forEach((nextChar, ind) => {
      setTimeout(() => {
        setEmail((currChar) => currChar + nextChar);
      }, 75 * ind);
    });
  };

  const typePassword = () => {
    demoPassword.forEach((nextChar, ind) => {
      setTimeout(() => {
        setPassword((currChar) => currChar + nextChar);
      }, 75 * ind);
    });
  };

  const loginDemoUser = () => {
    const demoUser = { email: "demo@io.com", password: "password" };
    return dispatch(sessionActions.login(demoUser));
  };

  return (
    <>
      <div className="login-container">
        <div className="login-left-container">
          <div className="login-header">
            <NavLink to={"/"}>
              <span className="login-logo">eventlite</span>
            </NavLink>
            <h1>Log in</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-email-container">
              <div>
                <label>Email address</label>
              </div>

              <input
                className="login-input"
                id="login-email-input"
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
              <div className="error-handling-text">{handleEmail()}</div>
            </div>

            {/* <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul> */}

            <div className="login-password-container">
              <div>
                <label>Password</label>
              </div>
              <input
                className="login-input"
                id="login-password-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
              <div className="error-handling-text">{handlePassword()}</div>
            </div>

            <br></br>

            <button type="submit" className="login-button">
              Login
            </button>

            <div className="or-separator">
              {/* <div className="login-rail"></div> */}
              <div className="login-or-text">
                <span> or </span>
              </div>
            </div>

            <button onClick={handleDemoLogin} className="demo-login-button">
              Demo Login
            </button>
          </form>

          <div className="login-link-container">
            <NavLink to={"/signup"}>
              <span className="signup-link">Sign Up</span>
            </NavLink>
          </div>
        </div>

        <div className="login-right-container">
          <img
            src="https://eventlite-22-seeds.s3.amazonaws.com/loginForm.jpeg"
            alt=""
          ></img>
          <div className="img-text-container">
            <div className="top-img-text-container">Brooklyn Bike Tour</div>
            <div className="bottom-img-test-container">New York, NY</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
