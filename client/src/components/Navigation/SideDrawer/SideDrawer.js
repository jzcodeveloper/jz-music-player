import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";

const SideDrawer = ({ show, close }) => {
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  const assignedClasses = [classes.SideDrawer];
  if (show) {
    assignedClasses.push(classes.Open);
  } else {
    assignedClasses.push(classes.Close);
  }

  return (
    <Fragment>
      <Backdrop show={show} click={close} />
      <div className={assignedClasses.join(" ")} onClick={close}>
        <NavigationItems isAuth={isAuthenticated} />
      </div>
    </Fragment>
  );
};

SideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default SideDrawer;
