import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./Action.css";

const Action = ({
  iconStyle,
  iconClass,
  description,
  linkPath,
  linkCaption
}) => (
  <div className={classes.Image}>
    <div className={classes.Overlay}>
      <div className={classes.Content}>
        <i className={`${classes.Icon} ${iconStyle} ${iconClass}`} />
        <div>
          <p>{description}</p>
          <Link to={linkPath}>{linkCaption}</Link>
        </div>
      </div>
    </div>
  </div>
);

Action.propTypes = {
  iconStyle: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
  linkCaption: PropTypes.string.isRequired
};

export default Action;
