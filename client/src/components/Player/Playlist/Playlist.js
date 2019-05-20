import React from "react";
import classes from "./Playlist.css";

const Playlist = props => {
  setTimeout(() => {
    props.toggleActiveClass();
  }, 1000);

  return (
    <ul className={classes.Playlist}>
      {props.playlist.map((song, index) => (
        <li key={index}>
          <span onClick={() => props.onClick(index)}>
            {song.artist} - {song.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
