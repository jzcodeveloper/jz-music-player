import React, { useRef } from "react";
import PropTypes from "prop-types";

import classes from "./Confirmation.css";

const Confirmation = ({
  action,
  closeConfirmation,
  title,
  question,
  caption1,
  caption2
}) => {
  const uniqueID = useRef(Date.now().toString());

  const onClick = () => {
    onCloseConfirmation();
    setTimeout(() => action(), 700);
  };

  const onCloseConfirmation = () => {
    const { OpenConfirmation, CloseConfirmation } = classes;
    const el = document.getElementById(uniqueID.current);
    if (el) el.classList.replace(OpenConfirmation, CloseConfirmation);
    setTimeout(() => closeConfirmation(), 700);
  };

  return (
    <section className={classes.Confirmation}>
      <div className={classes.OpenConfirmation} id={uniqueID.current}>
        <h1>{title}</h1>
        <span>{question}</span>
        <div>
          <button className={classes.Button} onClick={onClick}>
            {caption1}
          </button>
          <button className={classes.Cancel} onClick={onCloseConfirmation}>
            {caption2}
          </button>
        </div>
      </div>
    </section>
  );
};

Confirmation.propTypes = {
  action: PropTypes.func.isRequired,
  closeConfirmation: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  caption1: PropTypes.string.isRequired,
  caption2: PropTypes.string.isRequired
};

export default Confirmation;
