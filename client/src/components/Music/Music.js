import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Music.css";
import background from "../../assets/background.jpg";

import { fetchMetadata } from "../../actions/musicActions";
import { updateFavorites } from "../../actions/favoriteActions";

import Spinner from "../Spinner/Spinner";
import secondsToHms from "../../utils/secondsToHours";

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

  onFavoriteClick = (route, id) => {
    this.props.updateFavorites(route, id);
  };

  onAlbumArtClick=(pathname,id)=>{
    this.props.history.push(`/player/${pathname}/${id}`)
  }

  render() {
    let music = <Spinner />;

    if (!this.props.loading && this.props.albums.length > 0) {
      music = (
        <div className={classes.Music}>
          <span>TOP ALBUMS</span>
          <div>
            {this.props.albums.map((album) => (
              <figure key={album._id}>
                <img
                  src={
                    album.albumArt
                      ? "data:image/jpeg;base64," + album.albumArt.albumArt
                      : background
                  }
                  alt="Album Art"
                  onClick={()=>this.onAlbumArtClick('albums',album.album)}
                />
                <p>{album.album}</p>
                <p>{album.albumArtist}</p>
                <p>Songs: {album.count}</p>
                <p>Duration: {secondsToHms(album.duration)}</p>
                <button
                  className={classes.Favorite}
                  onClick={() => this.onFavoriteClick("albums", album._id)}
                >
                  <i
                    className={
                      album.favorites.indexOf(this.props.user.id) >= 0
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                  />
                </button>
              </figure>
            ))}
            <figure>
              <Link to="/more/albums">More albums...</Link>
            </figure>
          </div>
          <span>TOP ARTISTS</span>
          <div>
            {this.props.artists.map((artist) => (
              <figure key={artist._id}>
                <img
                  src={
                    artist.albumArt
                      ? "data:image/jpeg;base64," + artist.albumArt.albumArt
                      : background
                  }
                  alt="Album Art"
                  onClick={()=>this.onAlbumArtClick('artists',artist.artist)}
                />
                <p>{artist.artist}</p>
                <p>{artist.albumArtist}</p>
                <p>Songs: {artist.count}</p>
                <p>Duration: {secondsToHms(artist.duration)}</p>
                <button
                  className={classes.Favorite}
                  onClick={() => this.onFavoriteClick("artists", artist._id)}
                >
                  <i
                    className={
                      artist.favorites.indexOf(this.props.user.id) >= 0
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                  />
                </button>
              </figure>
            ))}
            <figure>
              <Link to="/more/artists">More artists...</Link>
            </figure>
          </div>
          <span>TOP SONGS</span>
          <div>
            {this.props.songs.map((song) => (
              <figure key={song._id}>
                <img
                  src={
                    song.albumArt
                      ? "data:image/jpeg;base64," + song.albumArt.albumArt
                      : background
                  }
                  alt="Album Art"
                  onClick={()=>this.onAlbumArtClick('songs',song.title)}
                />
                <p>{song.title}</p>
                <p>{song.artist}</p>
                <p>Genre: {song.genre.join(" /")}</p>
                <p>Duration: {secondsToHms(song.duration)}</p>
                <button
                  className={classes.Favorite}
                  onClick={() => this.onFavoriteClick("songs", song._id)}
                >
                  <i
                    className={
                      song.favorites.indexOf(this.props.user.id) >= 0
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                  />
                </button>
              </figure>
            ))}
            <figure>
              <Link to="/more/songs">More songs...</Link>
            </figure>
          </div>
          <button onClick={this.scrollRight}>{"<"}</button>
          <button onClick={this.scrollLeft}>></button>
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
    songs: state.music.metadata.songsInfo,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMetadata: () => dispatch(fetchMetadata()),
    updateFavorites: (route, id) => dispatch(updateFavorites(route, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Music);
