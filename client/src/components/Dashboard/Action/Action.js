import React from "react";
import {Link} from 'react-router-dom'
import classes from "./Action.css";

const Action = (props) => (
  <div className={classes.Image}>
    <div className={classes.Overlay}>
      <div className={classes.Content}>
        <i
          className={`${classes.Icon} ${props.iconStyle} ${props.iconClass}`}
        />
        <div>
          <p>{props.description}</p>
          <Link to={props.linkPath}>{props.linkCaption}</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Action;
