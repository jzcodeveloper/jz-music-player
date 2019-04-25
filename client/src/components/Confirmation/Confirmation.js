import React from "react";
import classes from "./Confirmation.css";

const Confirmation = props => {
  const onClick = () => {
    props.action();
    closeConfirmation()
  };

  const closeConfirmation=()=>{
    const el = document.querySelector(`.${classes.OpenConfirmation}`);
    el.className = classes.CloseConfirmation;
    setTimeout(() => props.closeConfirmation(), 700);
  }

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
