import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import classes from "./App.css";
import store from "./store";

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

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={classes.App}>
            <Toolbar click={this.onMenuClick} />
            <Backdrop show={this.state.openSide} click={this.onMenuClick} />
            <SideDrawer show={this.state.openSide} />
            <div className={classes.Main}>
              <Switch>
                <Route path="/more" component={More} />
              </Switch>
              <Switch>
                <Route path="/player" component={Player} />
              </Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/music" component={Music} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
