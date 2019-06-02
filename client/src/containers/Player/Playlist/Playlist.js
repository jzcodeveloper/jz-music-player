import React, { Component } from "react";
import classes from "./Playlist.css";

class Playlist extends Component {
  componentDidMount() {
    this.props.toggleActiveClass();
  }

  render() {
    return (
      <ul className={classes.Playlist}>
        {this.props.playlist.map((song, index) => (
          <li key={index}>
            <span onClick={() => this.props.onClick(index)}>
              {song.artist} - {song.title}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}

export default Playlist;
