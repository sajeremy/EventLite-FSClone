// function App() {
//   return <h1>Yo... Jimmy</h1>;
// }

// export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation/index";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Navigation />
        </Route>
        <Route path="/login">
          <>
            <h1>Login Page</h1>
            <LoginFormPage />
          </>
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
