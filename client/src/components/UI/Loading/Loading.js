import React from "react";

import classes from "./Loading.css";
import icon from "../../../images/icon.png";

const Loading = () => (
  <div className={classes.Modal}>
    <div className={classes.Container}>
      <img src={icon} alt="Icon" />
    </div>
    <p>JZ Music Player</p>
  </div>
);

export default Loading;
