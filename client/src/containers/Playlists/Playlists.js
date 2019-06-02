import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Playlists.css";

import {
  fetchPlaylists,
  createPlaylist,
  editPlaylist,
  removePlaylist
} from "../../actions/playlistsActions";

import Spinner from "../../components/UI/Spinner/Spinner";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Confirmation from "../../components/UI/Confirmation/Confirmation";
import Notification from "../../components/UI/Notification/Notification";
import Modal from "../../components/App/Modal/Modal";
import ListElement from "../../components/App/ListElement/ListElement";
import Playlist from "./Playlist/Playlist";

class Playlists extends Component {
  state = {
    playlistIndex: 0,
    showModal: false,
    showConfirmation: false,
    showNotification: false,
    action: ""
  };

  componentDidMount() {
    document.title = `JZ Music Player - My Playlists`;
    this.props.fetchPlaylists(this.props.user.id);
  }

  toggleClassName = index => {
    const selector = `.${classes.Playlists} > div:nth-of-type(${index +
      1}) > div`;
    const elements = document.querySelectorAll(selector);
    for (let i = 1; i < elements.length; i++) {
      if (elements[i].style.display === "flex") {
        elements[i].style.display = "none";
      } else {
        elements[i].style.display = "flex";
      }
    }
  };

  createPlaylist = payload => {
    this.props.createPlaylist(payload);
  };

  editPlaylist = (playlistId, payload) => {
    this.props.editPlaylist(playlistId, payload);
  };

  removePlaylist = () => {
    const { playlists } = this.props;
    const { playlistIndex } = this.state;
    this.props.removePlaylist(playlists[playlistIndex]._id);
  };

  onPlayClick = id => {
    this.props.history.push(`/player/playlists/${id}`);
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

  showModal = index => {
    const updatedState = {};
    if (index === null) {
      updatedState.action = "create";
    } else {
      updatedState.action = "edit";
    }
    updatedState.playlistIndex = index;
    updatedState.showModal = true;
    this.setState(updatedState);
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
    const { playlists } = this.props;
    const { action, playlistIndex } = this.state;
    let title,
      question = "";
    if (action === "removePlaylist" && playlists[playlistIndex]) {
      title = "Remove playlist";
      question = `Are you sure you want to remove the playlist '${
        playlists[playlistIndex].name
      }'?`;
    }

    let playlistsPage = <Spinner />;

    if (!this.props.loading) {
      playlistsPage = (
        <div className={classes.Playlists}>
          <h1>My Playlists</h1>
          <button
            className={classes.CreatePlaylist}
            onClick={() => this.showModal(null)}
          >
            Create Playlist
          </button>
          {playlists.length > 0 ? (
            playlists.map((playlist, index) => (
              <div key={playlist._id}>
                <Playlist
                  playlist={playlist}
                  index={index}
                  onPlayClick={this.onPlayClick}
                  showNotification={this.showNotification}
                  showModal={this.showModal}
                  onRemoveClick={this.onRemoveClick}
                  toggleClassName={this.toggleClassName}
                />

                {playlist.songs.length > 0 ? (
                  playlist.songs.map(song => (
                    <ListElement
                      key={song._id}
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
            ))
          ) : (
            <div>
              <p>You have not created any playlist</p>
            </div>
          )}

          {this.state.showModal ? (
            <Modal
              closeModal={this.closeModal}
              action={this.state.action}
              playlistIndex={this.state.playlistIndex}
              createPlaylist={this.createPlaylist}
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
        </div>
      );
    }

    return playlistsPage;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.playlists.loading,
    playlists: state.playlists.playlists
  };
};

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
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
