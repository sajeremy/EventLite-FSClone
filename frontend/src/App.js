// function App() {
//   return <h1>Yo... Jimmy</h1>;
// }

// export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation/index";
import EventIndexPage from "./components/EventIndexPage/index.js";
import EventShowPage from "./components/EventShowPage/index";
import HomePageBanner from "./components/HomePageBanner";
import EventCreateFormPage from "./components/EventCreateFormPage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Navigation />
          <HomePageBanner />
          <EventIndexPage />
        </Route>
        <Route exact path="/events">
          <EventCreateFormPage />
        </Route>
        <Route path="/events/:eventId">
          <Navigation />
          <EventShowPage />
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
