import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Music.css";
import background from "../../assets/background.jpg";

import { fetchMetadata } from "../../actions/musicActions";

import Spinner from "../Spinner/Spinner";

class Music extends Component {
  componentDidMount() {
    this.props.fetchMetadata();
  }

  scrollLeft = () => {
    let buttons = document.querySelectorAll("span + div");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].scrollLeft -= 75;
    }
  };

  scrollRight = () => {
    let buttons = document.querySelectorAll("span + div");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].scrollLeft += 75;
    }
  };

  render() {
    let music = <Spinner />;

    if (!this.props.loading && this.props.albums.length > 0) {
      music = (
        <div className={classes.Music}>
          <span>TOP ALBUMS</span>
          <div>
            {this.props.albums.map(album => (
              <figure key={album._id}>
                <img
                  src={
                    album.albumArt !== ""
                      ? "data:image/jpeg;base64," + album.albumArt
                      : background
                  }
                  alt="Album Art"
                />
                <Link to={`/player/albums/${album.album}`}>{album.album}</Link>
              </figure>
            ))}
            <figure>
              <Link to="/more/albums">More albums...</Link>
            </figure>
          </div>
          <span>TOP ARTISTS</span>
          <div>
            {this.props.artists.map(artist => (
              <figure key={artist._id}>
                <img
                  src={
                    artist.albumArt !== ""
                      ? "data:image/jpeg;base64," + artist.albumArt
                      : background
                  }
                  alt="Album Art"
                />
                <Link to={`/player/artists/${artist.artist}`}>
                  {artist.artist}
                </Link>
              </figure>
            ))}
            <figure>
              <Link to="/more/artists">More artists...</Link>
            </figure>
          </div>
          <span>TOP SONGS</span>
          <div>
            {this.props.songs.map(song => (
              <figure key={song._id}>
                <img
                  src={
                    song.albumArt !== ""
                      ? "data:image/jpeg;base64," + song.albumArt
                      : background
                  }
                  alt="Album Art"
                />
                <Link to={`/player/songs/${song.title}`}>{song.title}</Link>
              </figure>
            ))}
            <figure>
              <Link to="/more/songs">More songs...</Link>
            </figure>
            <button onClick={this.scrollRight}>{"<"}</button>
            <button onClick={this.scrollLeft}>></button>
          </div>
        </div>
      );
    }

    return music;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    albums: state.music.metadata.albumsInfo,
    artists: state.music.metadata.artistsInfo,
    songs: state.music.metadata.songsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMetadata: () => dispatch(fetchMetadata())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Music);
