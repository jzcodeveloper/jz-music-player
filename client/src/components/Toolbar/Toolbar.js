import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Toolbar.css";

const Toolbar = props => (
  <nav className={classes.Toolbar}>
    <div onClick={props.click}>
      <div />
      <div />
      <div />
    </div>
    <ul>
      <li>
        <NavLink activeClassName={classes.active} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={classes.active} to="/music">
          Music
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={classes.active} to="/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={classes.active} to="/register">
          Sign Up
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Toolbar;
