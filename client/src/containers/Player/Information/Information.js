import React from "react";
import classes from "./Information.css";

const Information = props => {
  return (
    <div className={classes.Information}>
      <p>Artist: {props.artists ? props.artists : "Loading..."}</p>
      <p>Song: {props.song ? props.song.title : "Loading..."}</p>
      <p>Album: {props.song ? props.song.album : "Loading..."}</p>
      <p>Year: {props.song ? props.song.year : "Loading..."}</p>
    </div>
  );
};

export default Information;
