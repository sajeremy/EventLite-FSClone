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
          debugger;
          data = await res.text(); // Will hit this case if the server is down
        }
        // debugger;
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    // debugger;
    setTimeout(typeEmail, 50);
    // debugger;
    setTimeout(typePassword, 1000);
    // debugger;
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br></br>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <br></br>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br></br>
        <button onClick={handleDemoLogin}>Demo Log In</button>
        <br></br>
        <button type="submit">Log In</button>
      </form>
      <NavLink to="/signup">Sign Up</NavLink>
    </div>
  );
}

export default LoginFormPage;
