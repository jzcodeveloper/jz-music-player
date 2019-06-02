import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../../actions/authActions";

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser(this.props.history);
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: history => dispatch(logoutUser(history))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);
