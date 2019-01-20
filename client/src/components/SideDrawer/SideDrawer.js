import React from "react";
import { Link } from "react-router-dom";
import classes from "./SideDrawer.css";

const SideDrawer = props => {
  let asignedClasses = [classes.SideDrawer];
  if (props.show) {
    asignedClasses.push(classes.Open);
  } else {
    asignedClasses.push(classes.Close);
  }

  return (
    <div className={asignedClasses.join(" ")}>
      <Link to="/">Home</Link>
      <Link to="/music">Music</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default SideDrawer;
