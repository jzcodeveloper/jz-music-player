import React from "react";
import { Link } from "react-router-dom";
import classes from "./Home.css";

const Home = () => {
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
};

export default Home;
