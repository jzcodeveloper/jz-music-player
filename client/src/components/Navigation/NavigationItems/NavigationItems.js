import React, { Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({ isAuth }) => (
  <ul className={classes.NavigationItems}>
    {isAuth ? (
      <Fragment>
        <NavigationItem link="/dashboard">Dashboard</NavigationItem>
        <NavigationItem link="/music">Browse Music</NavigationItem>
        <NavigationItem link="/favorites">My Favorites</NavigationItem>
        <NavigationItem link="/playlists">My Playlists</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Fragment>
    ) : (
      <Fragment>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/register">Register</NavigationItem>
      </Fragment>
    )}
  </ul>
);

NavigationItems.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

export default NavigationItems;
