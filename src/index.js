import React, { useState } from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, About, Users } from "./components/index";

import "./main.css";
import "./second.css";
import "purecss";
import "./mysass.scss";

const App = () => {
  const [theme, setTheme] = useState("darkblue");

  return (
    <Router>
      <div>
        <div>
          <Link to="/">This is Header {theme}</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        <div>
          <Link to="/users">Users </Link>
        </div>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="*">404</Route>
        </Switch>
      </div>
    </Router>
  );
};

//FOR SSR:
// ReactDOM.render(<App />, document.getElementById("root"));
export default App;

// import "react";
// import "react-dom";

// import component from "./component";
// import "./main.css";
// import "./second.css";
// import "purecss";

// // import "./mysass.scss";

// document.body.appendChild(component());
