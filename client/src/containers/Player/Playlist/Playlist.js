import React, { Component } from "react";
import classes from "./Playlist.css";
import background from "../../../assets/background.jpg";

class Playlist extends Component {
  componentDidMount() {
    this.props.toggleActiveClass();
  }

  render() {
    return (
      <ul className={classes.Playlist}>
        {this.props.playlist.map((song, index) => (
          <li key={index} onClick={() => this.props.onClick(index)}>
            <img
              src={
                song.albumArt !== ""
                  ? require(`../../../assets/albumArts/${
                      song.albumArt.albumArt
                    }`)
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
  }
}

export default Playlist;
