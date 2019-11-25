import React from "react";
import PropTypes from "prop-types";

import classes from "./PlaylistItem.css";
import background from "../../../images/background.jpg";

const PlaylistItem = ({ albumArt: { albumArt }, title, artist }) => {
  return (
    <>
      <img
        className={classes.Image}
        src={
          albumArt !== ""
            ? require(`../../../images/albumArts/${albumArt}`)
            : background
        }
        alt="Album Art"
      />
      <div className={classes.Content}>
        <span>{title}</span>
        <span>{artist}</span>
      </div>
    </>
  );
};

PlaylistItem.propTypes = {
  albumArt: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired
};

export default PlaylistItem;
