import React from "react";
import "./App.css";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";

import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/homepage" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
