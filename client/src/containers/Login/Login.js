import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../store/actions/authActions";
import { setErrors } from "../../store/actions/errorsActions";

import classes from "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(({ auth }) => auth);

  const errors = useSelector(({ errors }) => errors);

  const [state, setState] = useState({ email: "", password: "" });

  const { email, password } = state;

  useEffect(() => {
    document.title = `JZ Music Player - Login`;
    return () => dispatch(setErrors());
  }, []);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className={classes.Login}>
      <form onSubmit={onSubmit}>
        <h1>Log In</h1>
        <span>Sign in to your account</span>
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
