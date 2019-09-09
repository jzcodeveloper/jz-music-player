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

export default Home;
