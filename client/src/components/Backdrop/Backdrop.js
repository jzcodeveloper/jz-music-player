import React from "react";
import classes from "./Backdrop.css";

const Backdrop = props => {
  let backdrop = null;
  if (props.show) {
    backdrop = <section className={classes.Backdrop} onClick={props.click} />;
  }

  return backdrop;
};

export default Backdrop;
