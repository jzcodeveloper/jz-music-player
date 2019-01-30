import React, { Component } from "react";
import axios from 'axios'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Home.css";

class Home extends Component {
  state={
    count:0
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/music");
    } else {
      axios.get('/count/songs').then(res=>this.setState({count:res.data}))
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
              {this.state.count} songs currently available.
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
