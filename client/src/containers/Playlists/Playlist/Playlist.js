import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Playlist.css";

import {
  fetchPlaylists,
  createPlaylist,
  editPlaylist,
  removePlaylist
} from "../../../actions/playlistsActions";

import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import Confirmation from "../../../components/UI/Confirmation/Confirmation";
import Notification from "../../../components/UI/Notification/Notification";
import Modal from "../../../components/App/Modal/Modal";
import ListElement from "../../../components/App/ListElement/ListElement";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import { secondsToHms } from "../../../utils/utility";

class Playlist extends Component {
  state = {
    showModal: false,
    showConfirmation: false,
    showNotification: false,
    action: ""
  };

  toggleClassName = () => {
    //Collapse / Expand
    const { index } = this.props;
    const selector = `.${classes.Playlist} + div`;
    const elements = document.querySelectorAll(selector);
    const iconClasses = ["fa-plus-circle", "fa-minus-circle"];
    const icons = document.querySelectorAll(`.${classes.Expand} > i`);
    if (elements[index].style.display === "flex") {
      elements[index].style.display = "none";
      icons[index].classList.replace(iconClasses[1], iconClasses[0]);
    } else {
      elements[index].style.display = "flex";
      icons[index].classList.replace(iconClasses[0], iconClasses[1]);
    }
  };

  editPlaylist = (playlistId, payload) => {
    const { editPlaylist } = this.props;
    editPlaylist(playlistId, payload);
  };

  removePlaylist = () => {
    const { playlist, removePlaylist } = this.props;
    this.closePlaylist();
    setTimeout(() => removePlaylist(playlist._id), 500);
  };

  closePlaylist = () => {
    const { index } = this.props;
    const { OpenPlaylist, ClosePlaylist } = classes;
    const selector = `.${OpenPlaylist}`;
    const elements = document.querySelectorAll(selector);
    if (elements[index]) {
      elements[index].classList.replace(OpenPlaylist, ClosePlaylist);
    }
  };

  onPlayClick = id => {
    const { history } = this.props;
    history.push(`/player/playlists/${id}`);
  };

  onRemoveClick = index => {
    this.setState({
      action: "removePlaylist",
      showConfirmation: true,
      playlistIndex: index
    });
  };

  closeConfirmation = () => {
    this.setState({ action: "", showConfirmation: false });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  showNotification = () => {
    this.setState({ showNotification: true });
  };

  closeNotification = () => {
    this.setState({ showNotification: false });
  };

  render() {
    const { playlist, index } = this.props;
    const { action } = this.state;
    let title = "";
    let question = "Are you sure you want to remove the playlist ";
    if (action === "removePlaylist" && playlist) {
      title = "Remove playlist";
      question += `'${playlist.name}'?`;
    }

    return (
      <Aux>
        <div className={`${classes.Playlist} ${classes.OpenPlaylist}`}>
          <div>
            <span>{playlist.name}</span>
            <p>{playlist.description}</p>
          </div>
          <p>Songs: {playlist.count}</p>
          <p>Duration: {secondsToHms(playlist.duration) || 0}</p>
          <div>
            {playlist.songs.length > 0 ? (
              <button
                className={classes.Play}
                onClick={() => this.onPlayClick(playlist.name)}
              >
                <i className="fas fa-play" />
              </button>
            ) : (
              <button
                className={classes.Play}
                onClick={() => this.showNotification()}
              >
                <i className="fas fa-play" />
              </button>
            )}

            <button className={classes.Edit} onClick={() => this.showModal()}>
              <i className="fas fa-edit" />
            </button>
            <button
              className={classes.Remove}
              onClick={() => this.onRemoveClick()}
            >
              <i className="far fa-trash-alt" />
            </button>
            <button
              className={classes.Expand}
              onClick={() => this.toggleClassName()}
            >
              <i className="fas fa-plus-circle" />
            </button>
          </div>
        </div>

        <div>
          {playlist.songs.length > 0 ? (
            playlist.songs.map((song, index) => (
              <ListElement
                key={song._id}
                index={index}
                pathname="songs"
                info={song}
                playlist={playlist}
                history={this.props.history}
              />
            ))
          ) : (
            <div>
              <p>You have not added any song to this playlist</p>
            </div>
          )}
        </div>

        {this.state.showModal ? (
          <Modal
            closeModal={this.closeModal}
            action={"edit"}
            playlistIndex={index}
            editPlaylist={this.editPlaylist}
          />
        ) : null}

        {this.state.showNotification ? (
          <Notification
            title="Cannot play playlist"
            message="There must be at least one song added to this playlist in order to play it"
            closeNotification={this.closeNotification}
          />
        ) : null}

        {this.state.showConfirmation ? (
          <Confirmation
            title={title}
            question={question}
            caption1="Remove"
            caption2="Cancel"
            action={this.removePlaylist}
            closeConfirmation={this.closeConfirmation}
          />
        ) : null}

        {this.state.showModal ||
        this.state.showConfirmation ||
        this.state.showNotification ? (
          <Backdrop show />
        ) : null}
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPlaylists: userId => dispatch(fetchPlaylists(userId)),
    createPlaylist: payload => dispatch(createPlaylist(payload)),
    editPlaylist: (playlistId, payload) =>
      dispatch(editPlaylist(playlistId, payload)),
    removePlaylist: playlistId => dispatch(removePlaylist(playlistId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Playlist);
