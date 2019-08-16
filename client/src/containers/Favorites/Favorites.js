import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchFavorites } from "../../store/actions/favoriteActions";

import classes from "./Favorites.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import ListElement from "../../components/App/ListElement/ListElement";

const Favorites = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(({ favorite }) => favorite);

  const { favoriteAlbums, favoriteArtists, favoriteSongs } = useSelector(
    ({ favorite }) => favorite.favorite
  );

  useEffect(() => {
    document.title = `JZ Music Player - My Favorites`;
    dispatch(fetchFavorites());
  }, []);

  return (
    <Fragment>
      {loading || favoriteAlbums === null ? (
        <Spinner />
      ) : (
        <div className={classes.Favorites}>
          <h1>My Favorites</h1>
          <span>Favorite Albums</span>
          <div>
            {favoriteAlbums.length > 0 ? (
              favoriteAlbums.map(album => (
                <ListElement key={album._id} pathname="albums" info={album} />
              ))
            ) : (
              <p>You have no favorite albums</p>
            )}
          </div>
          <span>Favorite Artists</span>
          <div>
            {favoriteArtists.length > 0 ? (
              favoriteArtists.map(artist => (
                <ListElement
                  key={artist._id}
                  pathname="artists"
                  info={artist}
                />
              ))
            ) : (
              <p>You have no favorite artists</p>
            )}
          </div>
          <span>Favorite Songs</span>
          <div>
            {favoriteSongs.length > 0 ? (
              favoriteSongs.map(song => (
                <ListElement key={song._id} pathname="songs" info={song} />
              ))
            ) : (
              <p>You have no favorite songs</p>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Favorites;
