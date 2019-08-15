import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { updateFavorites } from "../../../store/actions/favoriteActions";

import classes from "./GridElement.css";
import background from "../../../assets/background.jpg";
import { secondsToHms } from "../../../utils/utility";

const GridElement = ({
  pathname,
  history,
  info: {
    _id,
    title,
    artist,
    album,
    albumArt,
    albumArtist,
    count,
    genre,
    duration
  },
  showPlaylists
}) => {
  const dispatch = useDispatch();
  const { favoriteAlbums, favoriteArtists, favoriteSongs } = useSelector(
    ({ auth }) => auth.user
  );

  const onFavoriteClick = (route, id) => {
    dispatch(updateFavorites(route, id));
  };

  const onAlbumArtClick = () => {
    if (pathname === "songs") {
      history.push(`/player/${pathname}/${artist} - ${title}`);
    } else {
      history.push(`/player/${pathname}/${artist || album}`);
    }
  };

  //Check whether to render a solid or a regular star icon
  let icon = "fa-star ";

  if (pathname === "albums") {
    icon += favoriteAlbums.indexOf(_id) >= 0 ? "fas" : "far";
  } else if (pathname === "artists") {
    icon += favoriteArtists.indexOf(_id) >= 0 ? "fas" : "far";
  } else {
    icon += favoriteSongs.indexOf(_id) >= 0 ? "fas" : "far";
  }

  return (
    <div className={`${classes.GridElement} ${classes.OpenGridElement}`}>
      <img
        src={
          albumArt !== ""
            ? require(`../../../assets/albumArts/${albumArt.albumArt}`)
            : background
        }
        alt="Album Art"
        onClick={() => onAlbumArtClick(pathname, title || artist || album)}
      />

      <p>{title || artist || album}</p>
      <p>{pathname === "songs" ? artist : albumArtist}</p>
      <p>{count ? `Songs: ${count}` : `Genre: ${genre.join(" /")}`}</p>
      <p>Duration: {secondsToHms(duration)}</p>

      <button
        className={`${classes.Icon} ${classes.AddToPlaylist}`}
        onClick={() => showPlaylists(pathname, _id)}
      >
        <i className="fas fa-list-ul" />
      </button>

      <button
        className={`${classes.Icon} ${classes.Favorite}`}
        onClick={() => onFavoriteClick(pathname, _id)}
      >
        <i className={icon} />
      </button>
    </div>
  );
};

GridElement.propTypes = {
  showPlaylists: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};

export default GridElement;
