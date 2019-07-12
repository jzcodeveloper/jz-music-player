import React, { Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./PlaylistItem.css";
import background from "../../../assets/background.jpg";

const PlaylistItem = ({ albumArt: { albumArt }, title, artist }) => {
  return (
    <Fragment>
      <img
        className={classes.Image}
        src={
          albumArt !== ""
            ? require(`../../../assets/albumArts/${albumArt}`)
            : background
        }
        alt="Album Art"
      />
      <div className={classes.Content}>
        <span>{title}</span>
        <span>{artist}</span>
      </div>
    </Fragment>
  );
};

PlaylistItem.propTypes = {
  albumArt: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired
};

export default PlaylistItem;
