import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import classes from "./SideDrawer.css";

class SideDrawer extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.itemClick();
  };

  onClick = () => {
    this.props.itemClick();
  };

  render() {
    let asignedClasses = [classes.SideDrawer];
    if (this.props.show) {
      asignedClasses.push(classes.Open);
    } else {
      asignedClasses.push(classes.Close);
    }

    const authLinks = (
      <div className={asignedClasses.join(" ")}>
        <Link to="/dashboard" onClick={this.onClick}>
          Dashboard
        </Link>
        <Link to="/favorites" onClick={this.onClick}>
          My Favorites
        </Link>
        <Link to="/playlists" onClick={this.onClick}>
          My Playlists
        </Link>
        <Link to="/music" onClick={this.onClick}>
          Browse Music
        </Link>
        <Link to="/" onClick={this.onLogoutClick}>
          Logout
        </Link>
      </div>
    );

    const guestsLinks = (
      <div className={asignedClasses.join(" ")}>
        <Link to="/" onClick={this.onClick}>
          Home
        </Link>
        <Link to="/login" onClick={this.onClick}>
          Login
        </Link>
        <Link to="/register" onClick={this.onClick}>
          Register
        </Link>
      </div>
    );

    return this.props.isAuthenticated ? authLinks : guestsLinks;
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
)(SideDrawer);
