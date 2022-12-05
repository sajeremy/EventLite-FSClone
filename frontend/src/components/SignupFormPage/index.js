import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === confirmEmail) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ first_name, last_name, email, password })
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
    }
    return setErrors(["Emails must match"]);
  };

  return (
    <>
      <div className="split left">
        <div className="centered">
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Email address</label>
              </div>

              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <br></br>

            <div>
              <div>
                <label>Confirm email</label>
              </div>
              <input
                type="text"
                placeholder="confirm email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
            </div>

            <br></br>

            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>

            <div>
              <div>
                <label>First Name</label>
              </div>
              <input
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                required
              />
            </div>

            <br></br>

            <div>
              <div>
                <label>Last Name</label>
              </div>
              <input
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                required
              />
            </div>

            <br></br>

            <div>
              <div>
                <label>Password</label>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <br></br>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          <img
            src="https://www.salserosenclave.com/wp-content/uploads/2017/08/fbevent_214045662456930.jpg"
            alt=""
          ></img>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;