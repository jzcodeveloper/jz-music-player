import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { countSongs } from "../../store/actions/countActions";

import classes from "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const { count } = useSelector(({ count }) => count);

  const { isAuthenticated } = useSelector(({ auth }) => auth);

  useEffect(() => {
    document.title = `JZ Music Player - Home`;
    if (count === 0) dispatch(countSongs());
  }, []);

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className={classes.Home}>
      <div className={classes.Top}>
        <div className={classes.Overlay}>
          <div>
            <h1>JZ Music Player</h1>
            <p>
              Listen to your favorite songs for free from any device. There are
              currently {count} songs available.
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

      <div className={classes.Middle}>
        <div className={classes.MiddleTitle}>
          <h1>What We Offer</h1>
        </div>
        <div className={classes.Services}>
          <div className={classes.Service}>
            <i className="fas fa-music"></i>
            <h3>Audio Streaming</h3>
            <p>High-quality audio streaming to any device over HTTPS.</p>
          </div>
          <div className={classes.Service}>
            <i className="fas fa-mobile-alt"></i>
            <h3>Listen Everywhere</h3>
            <p>This app works on your computer, mobile or tablet.</p>
          </div>
          <div className={classes.Service}>
            <i className="fas fa-headphones"></i>
            <h3>Unlimited, Ad-free Music</h3>
            <p>No ads, just listen to music.</p>
          </div>
          <div className={classes.Service}>
            <i className="fas fa-hand-holding-usd"></i>
            <h3>Premium Sounds Better</h3>
            <p>Get ready for incredible sound quality.</p>
          </div>
          <div className={classes.Service}>
            <i className="fas fa-download"></i>
            <h3>Download Your Songs</h3>
            <p>Download as many songs as you want.</p>
          </div>
          <div className={classes.Service}>
            <i className="far fa-star"></i>
            <h3>Offline Support</h3>
            <p>Keep listening to music even when offline.</p>
          </div>
        </div>
      </div>

      <div className={classes.Bottom}>
        <div className={classes.Overlay2}>
          <div>
            <h1>Why wait?</h1>
            <Link to="/login" className={classes.Register}>
              Start Now.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
