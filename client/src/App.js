import React, { Fragment, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Routes from "./hoc/Routes/Routes";
import Home from "./containers/Home/Home";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
import Loading from "./components/UI/Loading/Loading";
import Footer from "./components/UI/Footer/Footer";

//Redux
import store from "./store";
import { checkAuthState } from "./actions/authActions";

import "./App.css";

const App = () => {
  const [state, setState] = useState({ showSide: false, loading: true });
  const { showSide, loading } = state;

  useEffect(() => {
    store.dispatch(checkAuthState());
    setTimeout(() => setState({ ...state, loading: false }), 700);
  }, []);

  const toggleSideDrawer = () => {
    setState({ ...state, showSide: !showSide });
  };

  const closeSideDrawer = () => {
    setState({ ...state, showSide: false });
  };

  return (
    <Provider store={store}>
      <Router>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <Toolbar toggleSide={toggleSideDrawer} />
            <SideDrawer show={showSide} close={closeSideDrawer} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={Routes} />
            </Switch>
            <Footer />
          </Fragment>
        )}
      </Router>
    </Provider>
  );
};

export default App;
