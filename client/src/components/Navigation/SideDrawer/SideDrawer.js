import React from "react";

import classes from "./SideDrawer.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";

const SideDrawer = props => {
  let asignedClasses = [classes.SideDrawer];
  if (props.show) {
    asignedClasses.push(classes.Open);
  } else {
    asignedClasses.push(classes.Close);
  }

  return (
    <Aux>
      <Backdrop show={props.show} click={props.close} />
      <div className={asignedClasses.join(" ")} onClick={props.close}>
        <NavigationItems isAuth={props.isAuth} />
      </div>
    </Aux>
  );
};

export default SideDrawer;
