import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchFavorites } from "../../actions/favoriteActions";

import classes from "./Favorites.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import ListElement from "../../components/App/ListElement/ListElement";

const Favorites = ({
  fetchFavorites,
  loading,
  favorite: { favoriteAlbums, favoriteArtists, favoriteSongs }
}) => {
  useEffect(() => {
    document.title = `JZ Music Player - My Favorites`;
    fetchFavorites();
  }, []);

  return (
    <Fragment>
      {loading || favoriteAlbums === null ? (
        <Spinner />
      ) : (
        <div className={classes.Favorites}>
          <h1>My Favorites</h1>
          <span>Favorite Albums</span>
          {favoriteAlbums.length > 0 ? (
            favoriteAlbums.map((album, index) => (
              <ListElement
                key={album._id}
                index={index}
                pathname="albums"
                info={album}
              />
            ))
          ) : (
            <p>You have no favorite albums</p>
          )}
          <span>Favorite Artists</span>
          {favoriteArtists.length > 0 ? (
            favoriteArtists.map((artist, index) => (
              <ListElement
                key={artist._id}
                index={index}
                pathname="artists"
                info={artist}
              />
            ))
          ) : (
            <p>You have no favorite artists</p>
          )}
          <span>Favorite Songs</span>
          {favoriteSongs.length > 0 ? (
            favoriteSongs.map((song, index) => (
              <ListElement
                key={song._id}
                index={index}
                pathname="songs"
                info={song}
              />
            ))
          ) : (
            <p>You have no favorite songs</p>
          )}
        </div>
      )}
    </Fragment>
  );
};

Favorites.propTypes = {
  fetchFavorites: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  favorite: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    loading: state.favorite.loading,
    favorite: state.favorite.favorite
  };
};

export default connect(
  mapStateToProps,
  { fetchFavorites }
)(Favorites);
