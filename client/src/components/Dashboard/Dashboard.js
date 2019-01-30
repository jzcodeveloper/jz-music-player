import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Dashboard.css";

import { fetchFavorites } from "../../actions/favoriteActions";

import Spinner from "../Spinner/Spinner";
import ListElement from "../ListElement/ListElement";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchFavorites();
  }

  render() {
    const { favoriteAlbums, favoriteArtists, favoriteSongs } = this.props;

    let dashboard = <Spinner />;

    if (!this.props.loading) {
      dashboard = (
        <div className={classes.Dashboard}>
          <h1>Welcome, {this.props.user.name}</h1>
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

    return dashboard;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.loading.loading,
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
)(Dashboard);
