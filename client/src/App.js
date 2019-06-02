import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import store from "./store";
import { checkAuthState } from "./actions/authActions";
import classes from "./App.css";

import PrivateRoute from "./hoc/PrivateRoute/PrivateRoute";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Aux from "./hoc/Auxiliary/Auxiliary";
import Layout from "./hoc/Layout/Layout";
import Logout from "./components/App/Logout/Logout";

const asyncHome = asyncComponent(() => {
  return import("./containers/Home/Home");
});
const asyncLogin = asyncComponent(() => {
  return import("./containers/Login/Login");
});
const asyncRegister = asyncComponent(() => {
  return import("./containers/Register/Register");
});
const asyncMusic = asyncComponent(() => {
  return import("./containers/Music/Music");
});
const asyncMore = asyncComponent(() => {
  return import("./containers/More/More");
});
const asyncPlayer = asyncComponent(() => {
  return import("./containers/Player/Player");
});
const asyncDashboard = asyncComponent(() => {
  return import("./containers/Dashboard/Dashboard");
});
const asyncFavorites = asyncComponent(() => {
  return import("./containers/Favorites/Favorites");
});
const asyncPlaylists = asyncComponent(() => {
  return import("./containers/Playlists/Playlists");
});

//Check authentication state
store.dispatch(checkAuthState());

class App extends Component {
  render() {
    let routes = (
      <Aux>
        <Route exact path="/" component={asyncHome} />
        <Route exact path="/login" component={asyncLogin} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={asyncRegister} />

        <Switch>
          <PrivateRoute path="/more" component={asyncMore} />
          <PrivateRoute path="/music" component={asyncMusic} />
          <PrivateRoute path="/player" component={asyncPlayer} />
          <PrivateRoute path="/dashboard" component={asyncDashboard} />
          <PrivateRoute path="/favorites" component={asyncFavorites} />
          <PrivateRoute path="/playlists" component={asyncPlaylists} />
        </Switch>
      </Aux>
    );

    return (
      <div className={classes.App}>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default withRouter(App);
