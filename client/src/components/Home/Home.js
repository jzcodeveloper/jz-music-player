import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Home.css";

class Home extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/music");
    }
  }
  render() {
    return (
      <div className={classes.Home}>
        <div className={classes.Overlay}>
          <div>
            <p>
              JZ Music Player
              <br />
              Listen to your favorite songs for free...
              <br />
              More than 3500 songs available.
            </p>
            <div>
              <Link to="/register" className={classes.Register}>
                Register Now
              </Link>
              <Link to="/login" className={classes.Login}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Home);
