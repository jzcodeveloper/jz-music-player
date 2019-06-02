import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ListElement.css";

import { updateFavorites } from "../../../actions/favoriteActions";
import { removeFromPlaylist } from "../../../actions/playlistsActions";

import { secondsToHms } from "../../../utils/utility";
import background from "../../../assets/background.jpg";

import Confirmation from "../../UI/Confirmation/Confirmation";
import Backdrop from "../../UI/Backdrop/Backdrop";

class ListElement extends Component {
  state = {
    showConfirmation: false,
    action: ""
  };

  closeConfirmation = () => {
    this.setState({ action: "", showConfirmation: false });
  };

  onPlayClick = () => {
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

  onFavoriteClick = () => {
    this.setState({ action: "updateFavorites", showConfirmation: true });
  };

  onRemoveClick = () => {
    this.setState({ action: "removeFromPlaylist", showConfirmation: true });
  };

  updateFavorites = () => {
    const { pathname, info } = this.props;
    this.props.updateFavorites(pathname, info._id);
  };

  removeFromPlaylist = () => {
    const { playlist, info } = this.props;
    this.props.removeFromPlaylist(playlist._id, info._id);
  };

  render() {
    const { info, pathname } = this.props;
    const { action } = this.state;
    let title = "";
    let question = "";
    if (action === "updateFavorites") {
      title = "Remove from favorites";
      question = `Are you sure you want to remove '${info.title ||
        info.artist ||
        info.album}' from your favorites?`;
    }
    if (action === "removeFromPlaylist") {
      title = "Remove from playlist";
      question = `Are you sure you want to remove the song '${
        info.title
      }' from this playlist?`;
    }

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

        <button className={classes.Play} onClick={() => this.onPlayClick()}>
          <i className="fas fa-play" />
        </button>
        {!this.props.playlist ? (
          <button
            className={classes.Favorites}
            onClick={() => this.onFavoriteClick()}
          >
            <i className="fas fa-star" />
          </button>
        ) : (
          <button
            className={classes.Remove}
            onClick={() => this.onRemoveClick()}
          >
            <i className="far fa-trash-alt" />
          </button>
        )}

        {this.state.showConfirmation ? (
          <Confirmation
            title={title}
            question={question}
            caption1="Remove"
            caption2="Cancel"
            action={
              action === "updateFavorites"
                ? this.updateFavorites
                : this.removeFromPlaylist
            }
            closeConfirmation={this.closeConfirmation}
          />
        ) : null}
        {this.state.showConfirmation ? <Backdrop show /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFavorites: (route, id) => dispatch(updateFavorites(route, id)),
    removeFromPlaylist: (playlistId, songId) =>
      dispatch(removeFromPlaylist(playlistId, songId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ListElement);
