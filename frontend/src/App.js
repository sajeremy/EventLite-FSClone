// function App() {
//   return <h1>Yo... Jimmy</h1>;
// }

// export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation/index";
import EventIndexSection from "./components/EventIndexSection/index.js";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Navigation />
          <EventIndexSection />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
