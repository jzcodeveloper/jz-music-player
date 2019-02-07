import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Home.css";

import { countSongs } from "../../actions/countActions";

class Home extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/music");
    } else {
      if (this.props.count === 0) {
        this.props.countSongs();
      }
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
              {this.props.count} songs currently available.
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
    isAuthenticated: state.auth.isAuthenticated,
    count: state.count.count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countSongs: () => dispatch(countSongs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
