import React from "react";
import PropTypes from "prop-types";

import classes from "./Information.css";

const Information = ({ song: { title, album, year, artists } }) => {
  artists = artists.length === 1 ? artists[0] : artists.join(" / ");

  return (
    <div className={classes.Information}>
      <p>
        {artists.length === 1 ? "Artist:" : "Artists:"} {artists}
      </p>
      <p>Song: {title}</p>
      <p>Album: {album}</p>
      <p>Year: {year}</p>
    </div>
  );
};

Information.propTypes = {
  song: PropTypes.object.isRequired
};

export default Information;
