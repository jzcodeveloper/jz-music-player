import React from "react";

import classes from "./NavigationItems.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary.js";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => (
  <ul className={classes.NavigationItems}>
    {props.isAuth ? (
      <Aux>
        <NavigationItem link="/dashboard">Dashboard</NavigationItem>
        <NavigationItem link="/music">Browse Music</NavigationItem>
        <NavigationItem link="/favorites">My Favorites</NavigationItem>
        <NavigationItem link="/playlists">My Playlists</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
    ) : (
      <Aux>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/register">Register</NavigationItem>
      </Aux>
    )}
  </ul>
);

export default NavigationItems;
