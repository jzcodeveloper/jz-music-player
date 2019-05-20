import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Player.css";

import Spinner from "../Spinner/Spinner";
import Information from "./Information/Information";
import Playlist from "./Playlist/Playlist";
import Controls from "./Controls/Controls";

import {
  fetchPlaylist,
  resetPlaylist,
  setSongIndex,
  setPreviousIndex,
  setNextIndex
} from "../../actions/playerActions";

class Player extends Component {
  state = {
    showPlaylist: false
  };

  componentDidMount() {
    document.title = `JZ Music Player - Player`;
    const pathname = this.props.location.pathname.split("/");
    this.props.fetchPlaylist(pathname);
  }

  componentWillUnmount() {
    this.props.resetPlaylist();
  }

  toggleActiveClass = () => {
    const index = this.props.currentSongIndex + 1;
    const links = document.querySelectorAll("li > span");
    const link = document.querySelector(`li:nth-child(${index}) > span`);
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove(classes.active);
    }
    if (link) link.classList.add(classes.active);
  };

  onClick = index => {
    this.props.setSongIndex(index);
  };

  setPreviousIndex = () => {
    if (this.props.currentSongIndex > 0) {
      this.props.setPreviousIndex();
    }
  };

  setNextIndex = () => {
    if (this.props.playlist.length - 1 > this.props.currentSongIndex) {
      this.props.setNextIndex();
    }
  };

  togglePlaylist = () => {
    if (this.state.showPlaylist) {
      this.setState({ showPlaylist: false });
    } else {
      this.setState({ showPlaylist: true });
    }
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
          <div className={classes.TopSection}>
            <img
              src={
                song.albumArt
                  ? "data:image/jpeg;base64," + song.albumArt.albumArt
                  : ""
              }
              alt="Album Art"
            />
            <div>
              <span>{song.artist}</span>
              <span>{song.title}</span>
            </div>
            <i
              className={`fas ${
                !this.state.showPlaylist ? "fa-list-ul" : "fa-arrow-left"
              } ${classes.PlaylistIcon}`}
              onClick={this.togglePlaylist}
            />
          </div>

          <section>
            <div>
              {!this.state.showPlaylist ? (
                <Playlist
                  playlist={this.props.playlist}
                  onClick={this.onClick}
                  toggleActiveClass={this.toggleActiveClass}
                />
              ) : null}
            </div>
            <div>
              {this.state.showPlaylist ? (
                <Playlist
                  playlist={this.props.playlist}
                  onClick={this.onClick}
                  toggleActiveClass={this.toggleActiveClass}
                />
              ) : (
                <Information artists={artists} song={song} />
              )}
            </div>
          </section>

          <Controls
            src={song.url}
            toggleActiveClass={this.toggleActiveClass}
            setPreviousIndex={this.setPreviousIndex}
            setNextIndex={this.setNextIndex}
          />
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
    setPreviousIndex: () => dispatch(setPreviousIndex()),
    setNextIndex: () => dispatch(setNextIndex())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
