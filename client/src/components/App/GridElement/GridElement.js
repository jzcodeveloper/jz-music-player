import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./GridElement.css";

import { updateFavorites } from "../../../actions/favoriteActions";

import { secondsToHms } from "../../../utils/utility";
import background from "../../../assets/background.jpg";

class GridElement extends Component {
  onFavoriteClick = (route, id) => {
    this.props.updateFavorites(route, id);
  };

  onAlbumArtClick = () => {
    const { pathname, info } = this.props;
    if (pathname === "songs") {
      this.props.history.push(
        `/player/${pathname}/${info.artist} - ${info.title}`
      );
    } else {
      this.props.history.push(
        `/player/${pathname}/${info.artist || info.album}`
      );
    }
  };

  render() {
    const { info, pathname, user } = this.props;
    return (
      <div className={classes.GridElement}>
        <figure key={info._id}>
          <img
            src={
              info.albumArt
                ? "data:image/jpeg;base64," + info.albumArt.albumArt
                : background
            }
            alt="Album Art"
            onClick={() =>
              this.onAlbumArtClick(
                pathname,
                info.title || info.artist || info.album
              )
            }
          />
          <p>{info.title || info.artist || info.album}</p>
          <p>{pathname === "songs" ? info.artist : info.albumArtist}</p>
          <p>
            {info.count
              ? `Songs: ${info.count}`
              : `Genre: ${info.genre.join(" /")}`}
          </p>
          <p>Duration: {secondsToHms(info.duration)}</p>
          <button
            className={`${classes.Icon} ${classes.AddToPlaylist}`}
            onClick={() => this.props.showPlaylists(pathname, info._id)}
          >
            <i className="fas fa-list-ul" />
          </button>
          <button
            className={`${classes.Icon} ${classes.Favorite}`}
            onClick={() => this.onFavoriteClick(pathname, info._id)}
          >
            <i
              className={
                info.favorites.indexOf(user.id) >= 0
                  ? "fas fa-star"
                  : "far fa-star"
              }
            />
          </button>
        </figure>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFavorites: (route, id) => dispatch(updateFavorites(route, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridElement);
