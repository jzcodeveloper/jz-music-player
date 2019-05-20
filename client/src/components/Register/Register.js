import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Register.css";
import { register } from "../../actions/authActions";
import { setErrors } from "../../actions/errorsActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    document.title = `JZ Music Player - Register`;
    this.props.setErrors();
    if (this.props.isAuthenticated) this.props.history.push("/music");
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors)
      this.setState({ errors: this.props.errors });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const registerData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.register(registerData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className={classes.Register}>
        <form onSubmit={this.onSubmit}>
          <h1>Sign Up</h1>
          <span>Create an account</span>
          <input
            className={errors.name ? classes.Invalid : null}
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onChange}
          />
          {errors.name ? <p>{errors.name}</p> : null}
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
          <input
            className={errors.password2 ? classes.Invalid : null}
            name="password2"
            type="password"
            placeholder="Confirm Password"
            autoComplete="false"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {errors.password2 ? <p>{errors.password2}</p> : null}
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
    register: (payload, history) => dispatch(register(payload, history)),
    setErrors: () => dispatch(setErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
