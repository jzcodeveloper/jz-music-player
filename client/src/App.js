import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { setAuthToken } from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import classes from "./App.css";
import store from "./store";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Music from "./components/Music/Music";
import More from "./components/More/More";
import Player from "./components/Player/Player";
import Dashboard from "./components/Dashboard/Dashboard";

//Check for token
if (localStorage.Authorization) {
  //Set auth token header auth
  setAuthToken(localStorage.Authorization);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.Authorization);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current Profile
    store.dispatch(setCurrentUser());
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  state = {
    openSide: false
  };

  onMenuClick = () => {
    this.setState(prevState => {
      return {
        openSide: !prevState.openSide
      };
    });
  };

  onSideDrawerClick = () => {
    this.setState({ openSide: false });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={classes.App}>
            <Toolbar click={this.onMenuClick} />
            <Backdrop show={this.state.openSide} click={this.onMenuClick} />
            <SideDrawer
              show={this.state.openSide}
              itemClick={this.onSideDrawerClick}
            />
            <div className={classes.Main}>
              <Switch>
                <PrivateRoute path="/more" component={More} />
              </Switch>
              <Switch>
                <PrivateRoute path="/player" component={Player} />
              </Switch>
              <Switch>
                <PrivateRoute path="/music" component={Music} />
              </Switch>
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>

              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
