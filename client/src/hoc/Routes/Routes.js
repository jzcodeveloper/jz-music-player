import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import NotFound from "../../components/UI/NotFound/NotFound";
import Spinner from "../../components/UI/Spinner/Spinner";
import Logout from "../../components/App/Logout/Logout";

const Login = lazy(() => {
  return import("../../containers/Login/Login");
});

const Register = lazy(() => {
  return import("../../containers/Register/Register");
});

const Music = lazy(() => {
  return import("../../containers/Music/Music");
});

const More = lazy(() => {
  return import("../../containers/More/More");
});

const Player = lazy(() => {
  return import("../../containers/Player/Player");
});

const Dashboard = lazy(() => {
  return import("../../containers/Dashboard/Dashboard");
});

const Favorites = lazy(() => {
  return import("../../containers/Favorites/Favorites");
});

const Playlists = lazy(() => {
  return import("../../containers/Playlists/Playlists");
});

const Routes = () => (
  <Suspense fallback={<Spinner />}>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/register" render={props => <Register {...props} />} />
      <Route exact path="/logout" component={Logout} />
      <PrivateRoute path="/more" component={More} />
      <PrivateRoute path="/music" component={Music} />
      <PrivateRoute path="/player" component={Player} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/favorites" component={Favorites} />
      <PrivateRoute path="/playlists" component={Playlists} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
