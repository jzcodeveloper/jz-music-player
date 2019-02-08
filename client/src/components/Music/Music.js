import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Music.css";

import { fetchMetadata } from "../../actions/musicActions";
import { smoothScroll } from "../../utils/smoothScroll";

import Spinner from "../Spinner/Spinner";
import GridElement from "../GridElement/GridElement";

class Music extends Component {
  componentDidMount() {
    const { albums, artists, songs } = this.props;
    if (albums.length === 0 || artists.length === 0 || songs.length === 0) {
      this.props.fetchMetadata();
    }
  }

  toggleButtons = divs => {
    const left = document.querySelector("span + div + button");
    const right = document.querySelector("span + div + button + button");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].scrollLeft === 0) {
        left.style.display = "none";
      } else {
        left.style.display = "block";
      }

      if (divs[i].scrollLeft + divs[i].clientWidth >= divs[i].scrollWidth) {
        right.style.display = "none";
      } else {
        right.style.display = "block";
      }
    }
  };

  scrollLeft = () => {
    const divs = document.querySelectorAll("span + div");
    let targetScroll = divs[0].scrollLeft - 250;
    if (targetScroll < 0) targetScroll = 0;

    smoothScroll(divs[0], targetScroll, 251).then(()=>this.toggleButtons(divs));
    smoothScroll(divs[1], targetScroll, 251);
    smoothScroll(divs[2], targetScroll, 251);
  };

  scrollRight = () => {
    const divs = document.querySelectorAll("span + div");
    const maxScroll = divs[0].scrollWidth - divs[0].clientWidth;
    let targetScroll = divs[0].scrollLeft + 250;
    if (targetScroll > maxScroll) targetScroll = maxScroll;

    smoothScroll(divs[0], targetScroll, 251).then(()=>this.toggleButtons(divs));
    smoothScroll(divs[1], targetScroll, 251);
    smoothScroll(divs[2], targetScroll, 251);
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
              <Link to="/more/albums/">More albums...</Link>
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
              <Link to="/more/artists/">More artists...</Link>
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
              <Link to="/more/songs/">More songs...</Link>
            </figure>
          </div>
          <button onClick={this.scrollLeft}>{"<"}</button>
          <button onClick={this.scrollRight}>{">"}</button>
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
