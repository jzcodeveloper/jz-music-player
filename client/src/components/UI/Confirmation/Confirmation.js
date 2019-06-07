import React from "react";
import classes from "./Confirmation.css";

const Confirmation = props => {
  const onClick = () => {
    closeConfirmation();
    setTimeout(() => props.action(), 700);
  };

  const closeConfirmation = () => {
    const { OpenConfirmation, CloseConfirmation } = classes;
    const el = document.querySelector(`.${OpenConfirmation}`);
    if (el) el.classList.replace(OpenConfirmation, CloseConfirmation);
    setTimeout(() => props.closeConfirmation(), 700);
  };

  return (
    <section className={classes.Confirmation}>
      <div className={classes.OpenConfirmation}>
        <h1>{props.title}</h1>
        <span>{props.question}</span>
        <div>
          <button className={classes.Button} onClick={onClick}>
            {props.caption1}
          </button>
          <button className={classes.Cancel} onClick={closeConfirmation}>
            {props.caption2}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
