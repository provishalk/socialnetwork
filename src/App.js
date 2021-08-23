import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Activate from "./containers/Activate/Activate";
import SignUp from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";
import NotFound from "./components/Error/NotFound"
alertify.set("notifier", "position", "top-right");
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/activate" exact component={Activate} />
          <Route path="" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
