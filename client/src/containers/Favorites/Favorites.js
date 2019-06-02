import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Favorites.css";

import { fetchFavorites } from "../../actions/favoriteActions";

import Spinner from "../../components/UI/Spinner/Spinner";
import ListElement from "../../components/App/ListElement/ListElement";

class Favorites extends Component {
  componentDidMount() {
    document.title = `JZ Music Player - My Favorites`;
    this.props.fetchFavorites();
  }

  render() {
    const { favoriteAlbums, favoriteArtists, favoriteSongs } = this.props;

    let favorites = <Spinner />;

    if (!this.props.loading) {
      favorites = (
        <div className={classes.Favorites}>
          <h1>My Favorites</h1>
          <span>Favorite Albums</span>
          {favoriteAlbums.length > 0 ? (
            favoriteAlbums.map(album => (
              <ListElement
                key={album._id}
                pathname="albums"
                info={album}
                history={this.props.history}
              />
            ))
          ) : (
            <div>
              <p>You have no favorite albums</p>
            </div>
          )}
          <span>Favorite Artists</span>
          {favoriteArtists.length > 0 ? (
            favoriteArtists.map(artist => (
              <ListElement
                key={artist._id}
                pathname="artists"
                info={artist}
                history={this.props.history}
              />
            ))
          ) : (
            <div>
              <p>You have no favorite artists</p>
            </div>
          )}
          <span>Favorite Songs</span>
          {favoriteSongs.length > 0 ? (
            favoriteSongs.map(song => (
              <ListElement
                key={song._id}
                pathname="songs"
                info={song}
                history={this.props.history}
              />
            ))
          ) : (
            <div>
              <p>You have no favorite songs</p>
            </div>
          )}
        </div>
      );
    }

    return favorites;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.favorite.loading,
    favoriteAlbums: state.favorite.favorite.favoriteAlbums,
    favoriteArtists: state.favorite.favorite.favoriteArtists,
    favoriteSongs: state.favorite.favorite.favoriteSongs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFavorites: () => dispatch(fetchFavorites())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
