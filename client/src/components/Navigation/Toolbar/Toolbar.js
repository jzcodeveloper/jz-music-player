import React from "react";

import classes from "./Toolbar.css";
import icon from "../../../assets/13510.png";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = props => {
  return (
    <nav className={classes.Toolbar}>
      <div onClick={props.toggleSide}>
        <img src={icon} alt="Menu Icon" />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </nav>
  );
};

export default Toolbar;
