import React, { useEffect } from "react";
import classes from "./Playlist.css";
import background from "../../../assets/background.jpg";

const Playlist = props => {
  useEffect(() => {
    props.toggleActiveClass();
  }, []);

  return (
    <ul className={classes.Playlist}>
      {props.playlist.map((song, index) => (
        <li key={index} onClick={() => props.onClick(index)}>
          <img
            src={
              song.albumArt !== ""
                ? require(`../../../assets/albumArts/${song.albumArt.albumArt}`)
                : background
            }
            alt="Album Art"
          />
          <div>
            <span>{song.title}</span>
            <span>{song.artist}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
