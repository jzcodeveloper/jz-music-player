import React from "react";
import PropTypes from "prop-types";

import classes from "./Backdrop.css";

const Backdrop = ({ show, click }) => (
  <>{show ? <section className={classes.Backdrop} onClick={click} /> : null}</>
);

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired
};

export default Backdrop;
