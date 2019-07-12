import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";

const SideDrawer = ({ show, close, isAuth }) => {
  let asignedClasses = [classes.SideDrawer];
  if (show) {
    asignedClasses.push(classes.Open);
  } else {
    asignedClasses.push(classes.Close);
  }

  return (
    <Fragment>
      <Backdrop show={show} click={close} />
      <div className={asignedClasses.join(" ")} onClick={close}>
        <NavigationItems isAuth={isAuth} />
      </div>
    </Fragment>
  );
};

SideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(SideDrawer);
