import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation/index";
import EventIndexPage from "./components/EventIndexPage/index.js";
import EventShowPage from "./components/EventShowPage/index";
import HomePageBanner from "./components/HomePageBanner";
import EventCreateFormPage from "./components/EventCreateFormPage";
import CreatedEventsIndexPage from "./components/CreatedEventsIndexPage";
import EventEditFormPage from "./components/EventEditFormPage";
import PurchasedTicketsIndexPage from "./components/PurchasedTicketsIndexPage";
import LikedEventsIndexPage from "./components/LikedEventsIndexPage";
import LikedEventItem from "./components/LikedEventsIndexPage/LikedEventItem";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Navigation />
          <HomePageBanner />
          <EventIndexPage />
        </Route>
        <Route exact path="/events/create">
          <Navigation />
          <EventCreateFormPage />
        </Route>
        <Route exact path="/events/:eventId/edit">
          <Navigation />
          <EventEditFormPage />
        </Route>
        <Route path="/events/:eventId">
          <Navigation />
          <EventShowPage />
        </Route>
        <Route path="/users/:userId/events">
          <Navigation />
          <CreatedEventsIndexPage />
        </Route>
        <Route path="/users/:userId/tickets">
          <Navigation />
          <PurchasedTicketsIndexPage />
        </Route>
        <Route path="/users/:userId/likes">
          <Navigation />
          <LikedEventsIndexPage />
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
