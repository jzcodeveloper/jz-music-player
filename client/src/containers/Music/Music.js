import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Music.css";

import { fetchMetadata } from "../../actions/musicActions";
import { addToPlaylist } from "../../actions/playlistsActions";
import { smoothScroll } from "../../utils/smoothScroll";

import Spinner from "../../components/UI/Spinner/Spinner";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import GridElement from "../../components/App/GridElement/GridElement";
import AddToPlaylist from "../../components/App/AddToPlaylist/AddToPlaylist";

class Music extends Component {
  state = {
    showPlaylists: false,
    pathname: "",
    itemId: {}
  };

  showPlaylists = (pathname, itemId) => {
    this.setState({ showPlaylists: true, pathname, itemId });
  };

  closePlaylists = () => {
    this.setState({ showPlaylists: false, pathname: "", itemId: {} });
  };

  addToPlaylist = (route, playlistId, itemId) => {
    this.props.addToPlaylist(route, playlistId, itemId);
  };

  componentDidMount() {
    document.title = `JZ Music Player - Music`;
    const { albums, artists, songs } = this.props;
    if (albums.length === 0 || artists.length === 0 || songs.length === 0) {
      this.props.fetchMetadata();
    }
  }

  toggleButtons = index => {
    const divs = document.querySelectorAll("span + div");
    const left = document.querySelector(
      `span:nth-of-type(${index + 1}) + div > button:nth-of-type(1)`
    );
    const right = document.querySelector(
      `span:nth-of-type(${index + 1}) + div > button:nth-of-type(2)`
    );
    if (divs[index].scrollLeft === 0) {
      left.style.display = "none";
    } else {
      left.style.display = "block";
    }

    if (
      divs[index].scrollLeft + divs[index].clientWidth >=
      divs[index].scrollWidth
    ) {
      right.style.display = "none";
    } else {
      right.style.display = "block";
    }
  };

  scrollLeft = index => {
    const divs = document.querySelectorAll("span + div");
    let targetScroll = divs[index].scrollLeft - 250;
    if (targetScroll < 0) targetScroll = 0;

    smoothScroll(divs[index], targetScroll, 251).then(() =>
      this.toggleButtons(index)
    );
  };

  scrollRight = index => {
    const divs = document.querySelectorAll("span + div");
    const maxScroll = divs[index].scrollWidth - divs[index].clientWidth;
    let targetScroll = divs[index].scrollLeft + 250;
    if (targetScroll > maxScroll) targetScroll = maxScroll;

    smoothScroll(divs[index], targetScroll, 251).then(() =>
      this.toggleButtons(index)
    );
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
                showPlaylists={this.showPlaylists}
              />
            ))}
            <figure>
              <Link to="/more/albums/">More albums...</Link>
            </figure>

            <button onClick={() => this.scrollLeft(0)}>
              <p>{"<"}</p>
            </button>
            <button onClick={() => this.scrollRight(0)}>
              <p>{">"}</p>
            </button>
          </div>
          <span>TOP ARTISTS</span>
          <div>
            {artists.map(artist => (
              <GridElement
                key={artist._id}
                info={artist}
                pathname="artists"
                history={history}
                showPlaylists={this.showPlaylists}
              />
            ))}
            <figure>
              <Link to="/more/artists/">More artists...</Link>
            </figure>
            <button onClick={() => this.scrollLeft(1)}>
              <p>{"<"}</p>
            </button>
            <button onClick={() => this.scrollRight(1)}>
              <p>{">"}</p>
            </button>
          </div>
          <span>TOP SONGS</span>
          <div>
            {songs.map(song => (
              <GridElement
                key={song._id}
                info={song}
                pathname="songs"
                history={history}
                showPlaylists={this.showPlaylists}
              />
            ))}
            <figure>
              <Link to="/more/songs/">More songs...</Link>
            </figure>
            <button onClick={() => this.scrollLeft(2)}>
              <p>{"<"}</p>
            </button>
            <button onClick={() => this.scrollRight(2)}>
              <p>{">"}</p>
            </button>
          </div>

          {this.state.showPlaylists ? (
            <AddToPlaylist
              pathname={this.state.pathname}
              itemId={this.state.itemId}
              addToPlaylist={this.addToPlaylist}
              closePlaylists={this.closePlaylists}
            />
          ) : null}
          {this.state.showPlaylists ? <Backdrop show /> : null}
        </div>
      );
    }

    return music;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.music.loading,
    albums: state.music.metadata.albumsInfo,
    artists: state.music.metadata.artistsInfo,
    songs: state.music.metadata.songsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMetadata: () => dispatch(fetchMetadata()),
    addToPlaylist: (route, playlistId, itemId) =>
      dispatch(addToPlaylist(route, playlistId, itemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Music);
