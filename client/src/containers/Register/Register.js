import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { register } from "../../store/actions/authActions";
import { setErrors } from "../../store/actions/errorsActions";

import classes from "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(({ auth }) => auth.isAuthenticated);
  const errors = useSelector(({ errors }) => errors);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = state;

  useEffect(() => {
    document.title = `JZ Music Player - Register`;
    return () => dispatch(setErrors());
  }, []);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password, password2 }));
  };

  if (isAuth) return <Redirect to="/dashboard" />;

  return (
    <div className={classes.Register}>
      <form onSubmit={onSubmit}>
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

export default Register;
