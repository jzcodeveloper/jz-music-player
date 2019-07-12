import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateFavorites } from "../../../actions/favoriteActions";

import classes from "./GridElement.css";
import background from "../../../assets/background.jpg";
import { secondsToHms } from "../../../utils/utility";

const GridElement = ({
  updateFavorites,
  user,
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
    duration,
    favorites
  },
  showPlaylists
}) => {
  const onFavoriteClick = (route, id) => {
    updateFavorites(route, id);
  };

  const onAlbumArtClick = () => {
    if (pathname === "songs") {
      history.push(`/player/${pathname}/${artist} - ${title}`);
    } else {
      history.push(`/player/${pathname}/${artist || album}`);
    }
  };

  //Check whether to render a solid or a regular star icon
  const icon = favorites.indexOf(user._id) >= 0 ? "fas fa-star" : "far fa-star";

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
  updateFavorites: PropTypes.func.isRequired,
  showPlaylists: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { updateFavorites }
)(GridElement);
