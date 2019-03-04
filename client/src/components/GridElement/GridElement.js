import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./GridElement.css";

import { updateFavorites } from "../../actions/favoriteActions";
import { deleteSong } from "../../actions/songActions";

import { secondsToHms } from "../../utils/secondsToHms";
import background from "../../assets/background.jpg";

class GridElement extends Component {
  onFavoriteClick = (route, id) => {
    this.props.updateFavorites(route, id);
  };

  onDeleteClick = (route, id) => {
    this.props.deleteSong(route, id);
  };

  onAlbumArtClick = (pathname, id) => {
    this.props.history.push(`/player/${pathname}/${id}`);
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
          {user.email === "javier_bislip@hotmail.com" &&
          pathname === "songs" ? (
            <button
              className={`${classes.Icon} ${classes.Delete}`}
              onClick={() => this.onDeleteClick(pathname, info._id)}
            >
              <i className="fas fa-minus-circle" />
            </button>
          ) : null}
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
    updateFavorites: (route, id) => dispatch(updateFavorites(route, id)),
    deleteSong: (route, id) => dispatch(deleteSong(route, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridElement);
