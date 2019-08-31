import React from "react";
import PropTypes from "prop-types";

import classes from "./NotFound.css";
import NotFoundImage from "../../../images/not-found.jpg";

const NotFound = ({ msg }) => {
  return (
    <div className={classes.NotFound}>
      <img src={NotFoundImage} alt="Not Found" />
      <h1>{msg}</h1>
    </div>
  );
};

NotFound.propTypes = {
  msg: PropTypes.string
};

NotFound.defaultProps = {
  msg: "Page Not Found"
};

export default NotFound;
