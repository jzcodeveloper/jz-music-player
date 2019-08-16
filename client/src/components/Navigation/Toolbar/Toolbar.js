import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./Toolbar.css";
import icon from "../../../assets/icon.png";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = ({ toggleSide }) => {
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  return (
    <nav className={classes.Toolbar}>
      <div className={classes.MobileIcon} onClick={toggleSide}>
        <img src={icon} alt="Menu Icon" />
      </div>
      <div className={classes.DesktopIcon}>
        <img src={icon} alt="Menu Icon" />
      </div>
      <p>JZ Music Player</p>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={isAuthenticated} />
      </nav>
    </nav>
  );
};

Toolbar.propTypes = {
  toggleSide: PropTypes.func.isRequired
};

export default Toolbar;
