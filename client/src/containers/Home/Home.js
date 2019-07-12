import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { countSongs } from "../../actions/countActions";

import classes from "./Home.css";

const Home = ({ countSongs, isAuthenticated, count }) => {
  useEffect(() => {
    document.title = `JZ Music Player - Home`;
    if (count === 0) countSongs();
  }, []);

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className={classes.Home}>
      <div className={classes.Overlay}>
        <div>
          <p>
            JZ Music Player
            <br />
            Listen to your favorite songs for free...
            <br />
            {count} songs currently available.
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
};

Home.propTypes = {
  countSongs: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    count: state.count.count
  };
};

export default connect(
  mapStateToProps,
  { countSongs }
)(Home);
