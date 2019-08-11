import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classes from "./Toolbar.css";
import icon from "../../../assets/icon.png";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = ({ toggleSide, isAuth }) => (
  <nav className={`${classes.Toolbar} ${classes.showToolbar}`}>
    <div onClick={toggleSide}>
      <img src={icon} alt="Menu Icon" />
      {/*<div />
      <div />
      <div />*/}
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={isAuth} />
    </nav>
  </nav>
);

Toolbar.propTypes = {
  toggleSide: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Toolbar);
