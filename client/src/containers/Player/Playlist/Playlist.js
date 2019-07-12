import React, { useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./Playlist.css";
import PlaylistItem from "../PlaylistItem/PlaylistItem";

const Playlist = ({ toggleActiveClass, playlist, onClick }) => {
  useEffect(() => {
    toggleActiveClass();
  }, []);

  return (
    <ul className={classes.Playlist}>
      {playlist.map(({ albumArt, title, artist }, index) => (
        <li key={index} onClick={() => onClick(index)}>
          <PlaylistItem albumArt={albumArt} title={title} artist={artist} />
        </li>
      ))}
    </ul>
  );
};

Playlist.propTypes = {
  toggleActiveClass: PropTypes.func.isRequired,
  playlist: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Playlist;
