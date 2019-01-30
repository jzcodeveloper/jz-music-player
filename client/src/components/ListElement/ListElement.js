import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ListElement.css";

import { updateFavorites } from "../../actions/favoriteActions";

import secondsToHms from "../../utils/secondsToHours";
import background from "../../assets/background.jpg";

class ListElement extends Component {
  onFavoriteClick = (route, id) => {
    this.props.updateFavorites(route, id);
  };

  onPlayClick = (pathname, id) => {
    this.props.history.push(`/player/${pathname}/${id}`);
  };

  render() {
    const { info, pathname } = this.props;
    return (
      <div className={classes.ListElement}>
        <img
          src={
            info.albumArt
              ? "data:image/jpeg;base64," + info.albumArt.albumArt
              : background
          }
          alt="Album Art"
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
          className={classes.Play}
          onClick={() =>
            this.onPlayClick(pathname, info.title || info.artist || info.album)
          }
        >
          <i className="fas fa-play" />
        </button>
        <button
          className={classes.Favorites}
          onClick={() => this.onFavoriteClick(pathname, info._id)}
        >
          <i className="fas fa-star" />
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFavorites: (route, id) => dispatch(updateFavorites(route, id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ListElement);
