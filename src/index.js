import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const theme = useState("darkblue");

  return (
    <Router>
      <div>
        <header>
          <Link to="/">This is Header</Link>
        </header>

        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
