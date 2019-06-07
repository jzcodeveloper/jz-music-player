import React from "react";
import classes from "./Notification.css";

const Notification = props => {
  const onClick = () => {
    const { OpenNotification, CloseNotification } = classes;
    const el = document.querySelector(`.${OpenNotification}`);
    if (el) el.classList.replace(OpenNotification, CloseNotification);
    setTimeout(() => props.closeNotification(), 700);
  };

  return (
    <section className={classes.Notification}>
      <div className={classes.OpenNotification}>
        <h1>{props.title}</h1>
        <span>{props.message}</span>
        <div>
          <button className={classes.Cancel} onClick={() => onClick()}>
            Ok
          </button>
        </div>
      </div>
    </section>
  );
};

export default Notification;
