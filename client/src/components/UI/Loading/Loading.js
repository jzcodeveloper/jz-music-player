import React from "react";

import classes from "./Loading.css";
import icon from "../../../assets/icon.png";

const Loading = () => (
  <div className={classes.Modal}>
    <div className={classes.Container}>
      <img src={icon} alt="Icon" className={classes.Icon} />
    </div>
    <p>JZ Music Player</p>
  </div>
);

export default Loading;
