import React from "react";
import { Switch, Route } from "react-router-dom";
// import RoleRoute from './components/RoleRoute'
// import AsyncComponent from './components/AsyncComponent'
// import { Logout } from './containers'
// import { ErrorPages } from 'dc-common'
import { Home, About, Users } from "./components/index";

const NotFound = () => <div>ERROR 404</div>;
export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about" component={About} />
      <Route exact path="/users">
        <Users />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
