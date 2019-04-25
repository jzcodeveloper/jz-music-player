import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Player.css";

import Spinner from "../Spinner/Spinner";

import {
  fetchPlaylist,
  resetPlaylist,
  setSongIndex,
  setNextIndex
} from "../../actions/playerActions";

class Player extends Component {
  componentDidMount(){
    document.title=`JZ Music Player - Player`
  }

  componentWillMount() {
    const pathname = this.props.location.pathname.split("/");
    this.props.fetchPlaylist(pathname);
  }

  componentWillUnmount() {
    this.props.resetPlaylist();
  }

  ToggleActiveClass = () => {
    const links = document.querySelectorAll("span");
    const link = document.querySelector(
      `li:nth-child(${this.props.currentSongIndex + 1}) > span`
    );
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove(classes.active);
    }
    link.classList.add(classes.active);
  };

  onClick = (e, index) => {
    e.preventDefault();
    this.props.setSongIndex(index);
  };

  onEnded = () => {
    if (this.props.playlist.length - 1 > this.props.currentSongIndex) {
      this.props.setNextIndex();
    }
  };

  onDurationChange = e => {
    e.target.play();
  };

  render() {
    let player = <Spinner />;

    if (!this.props.loading && this.props.playlist.length > 0) {
      let artists = null;
      let song = this.props.playlist[this.props.currentSongIndex];
      if (song.artists && song.artists.length === 1) {
        artists = song.artist;
      } else {
        artists = song.artists.join(" / ");
      }

      player = (
        <div className={classes.Player}>
          <ul>
            {this.props.playlist.map((song, index) => {
              return (
                <li key={index}>
                  <span onClick={e => this.onClick(e, index)}>
                    {song.artist} - {song.title}
                  </span>
                </li>
              );
            })}
          </ul>
          <div>
            <div>
              <p>Artist: {artists ? artists : "Loading..."}</p>
              <p>Song: {song ? song.title : "Loading..."}</p>
              <p>Album: {song ? song.album : "Loading..."}</p>
              <p>Year: {song ? song.year : "Loading..."}</p>
            </div>
            <audio
              autoPlay
              controls
              controlsList="nodownload"
              src={song.url ? song.url : null}
              onDurationChange={this.onDurationChange}
              onEnded={this.onEnded}
              onPlay={this.ToggleActiveClass}
            />
          </div>
        </div>
      );
    }

    return player;
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.player.playlist,
    currentSongIndex: state.player.currentSongIndex,
    loading: state.player.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPlaylist: payload => dispatch(fetchPlaylist(payload)),
    resetPlaylist: () => dispatch(resetPlaylist()),
    setSongIndex: payload => dispatch(setSongIndex(payload)),
    setNextIndex: () => dispatch(setNextIndex())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
