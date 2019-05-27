import React from "react";
import classes from "./Loading.css";
import icon from "../../assets/13510.png";

const Loading = () => {
  setTimeout(() => {
    const el = document.getElementsByClassName(classes.Modal)[0];
    if (el) el.style.display = "none";
  }, 2000);

  return (
    <div className={classes.Modal}>
      <div className={classes.Container}>
        <img src={icon} alt="Icon" className={classes.Icon} />
      </div>
      <p>JZ Music Player</p>
    </div>
  );
};

export default Loading;