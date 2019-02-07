import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Music.css";

import { fetchMetadata } from "../../actions/musicActions";

import Spinner from "../Spinner/Spinner";
import GridElement from "../GridElement/GridElement";

class Music extends Component {
  componentDidMount() {
    const { albums, artists, songs } = this.props;
    if (albums.length === 0 || artists.length === 0 || songs.length === 0) {
      this.props.fetchMetadata();
    }
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

    const { albums, artists, songs, history, loading } = this.props;

    if (!loading && albums.length > 0) {
      music = (
        <div className={classes.Music}>
          <span>TOP ALBUMS</span>
          <div>
            {albums.map(album => (
              <GridElement
                key={album._id}
                info={album}
                pathname="albums"
                history={history}
              />
            ))}
            <figure>
              <Link to="/more/albums">More albums...</Link>
            </figure>
          </div>
          <span>TOP ARTISTS</span>
          <div>
            {artists.map(artist => (
              <GridElement
                key={artist._id}
                info={artist}
                pathname="artists"
                history={history}
              />
            ))}
            <figure>
              <Link to="/more/artists">More artists...</Link>
            </figure>
          </div>
          <span>TOP SONGS</span>
          <div>
            {songs.map(song => (
              <GridElement
                key={song._id}
                info={song}
                pathname="songs"
                history={history}
              />
            ))}
            <figure>
              <Link to="/more/songs">More songs...</Link>
            </figure>
          </div>
          <button onClick={this.scrollRight}>{">"}</button>
          <button onClick={this.scrollLeft}>{"<"}</button>
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
