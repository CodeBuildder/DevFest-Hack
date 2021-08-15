import React from "react";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import DashboardWorker from "./components/pages/DashboardWorker";
import DashboardClient from "./components/pages/DashboardClient";
import { GlobalProvider } from "./components/context/GlobalState";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <DashboardClient />
          </Route>
          <Route path="/worker/dashboard">
            <DashboardWorker />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
