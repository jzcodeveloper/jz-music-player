import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Login.css";
import { login } from "../../actions/authActions";
import { setErrors } from "../../actions/errorsActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    document.title = `JZ Music Player - Login`;
    this.props.setErrors();
    if (this.props.isAuthenticated) this.props.history.push("/dashboard");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated)
      this.props.history.push("/dashboard");
    if (prevProps.errors !== this.props.errors)
      this.setState({ errors: this.props.errors });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const loginData = {
      email: this.state.email,
      password: this.state.password,
      captcha: this.state.captcha
    };

    this.props.login(loginData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className={classes.Login}>
        <form onSubmit={this.onSubmit}>
          <h1>Log In</h1>
          <span>Sign in to your account</span>
          <input
            className={errors.email ? classes.Invalid : null}
            name="email"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email ? <p>{errors.email}</p> : null}
          <input
            className={errors.password ? classes.Invalid : null}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="false"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password ? <p>{errors.password}</p> : null}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(login(payload)),
    setErrors: () => dispatch(setErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
