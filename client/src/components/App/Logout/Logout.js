import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser } from "../../../actions/authActions";

const Logout = ({ logoutUser }) => {
  useEffect(() => {
    logoutUser();
  }, []);

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(Logout);
