import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { register } from "../../actions/authActions";
import { setErrors } from "../../actions/errorsActions";

import classes from "./Register.css";

const Register = ({ register, setErrors, isAuthenticated, errors }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = state;

  useEffect(() => {
    document.title = `JZ Music Player - Register`;
    return () => setErrors();
  }, []);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    register({ name, email, password, password2 });
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className={classes.Register}>
      <form onSubmit={e => onSubmit(e)}>
        <h1>Sign Up</h1>
        <span>Create an account</span>
        <input
          className={errors.name ? classes.Invalid : null}
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={onChange}
        />
        {errors.name ? <p>{errors.name}</p> : null}
        <input
          className={errors.email ? classes.Invalid : null}
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        {errors.email ? <p>{errors.email}</p> : null}
        <input
          className={errors.password ? classes.Invalid : null}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="false"
          value={password}
          onChange={onChange}
        />
        {errors.password ? <p>{errors.password}</p> : null}
        <input
          className={errors.password2 ? classes.Invalid : null}
          name="password2"
          type="password"
          placeholder="Confirm Password"
          autoComplete="false"
          value={password2}
          onChange={onChange}
        />
        {errors.password2 ? <p>{errors.password2}</p> : null}
        <button>Submit</button>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { register, setErrors }
)(Register);
