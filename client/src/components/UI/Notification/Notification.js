import React from "react";
import PropTypes from "prop-types";

import classes from "./Notification.css";

const Notification = ({ closeNotification, title, message }) => {
  const onClick = () => {
    const { OpenNotification, CloseNotification } = classes;
    const el = document.querySelector(`.${OpenNotification}`);
    if (el) el.classList.replace(OpenNotification, CloseNotification);
    setTimeout(() => closeNotification(), 700);
  };

  return (
    <section className={classes.Notification}>
      <div className={classes.OpenNotification}>
        <h1>{title}</h1>
        <span>{message}</span>
        <div>
          <button className={classes.Cancel} onClick={() => onClick()}>
            Ok
          </button>
        </div>
      </div>
    </section>
  );
};

Notification.propTypes = {
  closeNotification: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Notification;
