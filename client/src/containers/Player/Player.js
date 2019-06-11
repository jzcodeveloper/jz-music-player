import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Player.css";

import Spinner from "../../components/UI/Spinner/Spinner";
import Information from "./Information/Information";
import Playlist from "./Playlist/Playlist";
import Controls from "./Controls/Controls";

import background from "../../assets/background.jpg";

import {
  fetchPlaylist,
  resetPlaylist,
  setSongIndex,
  setPreviousIndex,
  setNextIndex,
  setRandomIndex
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
    const { active, Player } = classes;
    const prevElement = document.querySelector(`.${active}`);
    const nextElementSelector = `.${Player} li:nth-child(${index})`;
    const nextElement = document.querySelector(nextElementSelector);
    if (prevElement) prevElement.classList.remove(active);
    if (nextElement) nextElement.classList.add(active);
    const playlist = document.querySelector(`.${Player} ul`);
    playlist.scrollTop = nextElement.offsetTop - 20;
  };

  onClick = index => {
    this.props.setSongIndex(index);
  };

  setPreviousIndex = () => {
    if (this.props.currentSongIndex > 0) {
      this.props.setPreviousIndex();
      this.toggleActiveClass();
    }
  };

  setNextIndex = () => {
    if (this.props.playlist.length - 1 > this.props.currentSongIndex) {
      this.props.setNextIndex();
      this.toggleActiveClass();
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
                song.albumArt !== ""
                  ? require(`../../assets/albumArts/${song.albumArt.albumArt}`)
                  : background
              }
              alt="Album Art"
            />
            <div>
              <span>{song.title}</span>
              <span>{song.artist}</span>
            </div>
            <i
              className={`fas fa-list-ul ${
                this.state.showPlaylist ? `${classes.Brown}` : ""
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
              <Information artists={artists} song={song} />
              {this.state.showPlaylist ? (
                <Playlist
                  playlist={this.props.playlist}
                  onClick={this.onClick}
                  toggleActiveClass={this.toggleActiveClass}
                />
              ) : null}
            </div>
          </section>

          <Controls
            src={song.url}
            toggleActiveClass={this.toggleActiveClass}
            setPreviousIndex={this.setPreviousIndex}
            setNextIndex={this.setNextIndex}
            setRandomIndex={this.props.setRandomIndex}
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
    setNextIndex: () => dispatch(setNextIndex()),
    setRandomIndex: () => dispatch(setRandomIndex())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
