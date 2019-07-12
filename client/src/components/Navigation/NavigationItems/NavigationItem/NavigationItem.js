import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./NavigationItem.css";

const NavigationItem = ({ link, children }) => (
  <li className={classes.NavigationItem}>
    <NavLink to={link}>{children}</NavLink>
  </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default NavigationItem;
