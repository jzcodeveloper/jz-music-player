import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { NavLink } from "react-router-dom";
import classes from "./Toolbar.css";
import icon from "../../assets/13510.png";

class Toolbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const authLinks = (
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/music">Browse Music</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">My Favorites</NavLink>
        </li>
        <li>
          <NavLink to="/playlists">My Playlists</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={this.onLogoutClick}>
            Logout
          </NavLink>
        </li>
      </ul>
    );

    const guestsLinks = (
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Sign Up</NavLink>
        </li>
      </ul>
    );

    return (
      <nav className={classes.Toolbar}>
        <div onClick={this.props.click}>
          <img src={icon} alt="Menu Icon" />
        </div>
        {this.props.isAuthenticated ? authLinks : guestsLinks}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
