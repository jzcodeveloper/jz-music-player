import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./AddToPlaylist.css";
import {
  fetchPlaylists,
  createPlaylist
} from "../../../actions/playlistsActions";

import Modal from "../Modal/Modal";

class AddToPlaylist extends Component {
  state = {
    selectedPlaylistIndex: null,
    showModal: false
  };

  componentDidMount() {
    this.props.fetchPlaylists(this.props.user.id);
  }

  selectPlaylist = index => {
    this.setState({ selectedPlaylistIndex: index });
  };

  onClick = () => {
    const { pathname, itemId } = this.props;
    const playlist = this.props.playlists[this.state.selectedPlaylistIndex];
    this.props.addToPlaylist(pathname, playlist._id, itemId);
    this.closePlaylists();
  };

  closePlaylists = () => {
    const el = document.querySelector(`.${classes.OpenModal}`);
    if (el) el.className = classes.CloseModal;
    setTimeout(() => this.props.closePlaylists(), 700);
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  createPlaylist = payload => {
    this.props.createPlaylist(payload);
  };

  render() {
    let addToPlaylist = null;
    if (!this.props.loading) {
      addToPlaylist = (
        <section className={classes.AddToPlaylist}>
          <div className={classes.OpenModal}>
            <h1>Add to playlist</h1>
            <span>Select one of your playlists</span>
            <div className={classes.Playlists}>
              {this.props.playlists.map((playlist, index) => (
                <div key={playlist._id} className={classes.Playlist}>
                  <span>{playlist.name}</span>
                  <i
                    className={`${classes.Icon} ${
                      this.state.selectedPlaylistIndex === index
                        ? "fas fa-check-circle"
                        : "far fa-circle"
                    }`}
                    onClick={() => this.selectPlaylist(index)}
                  />
                </div>
              ))}
            </div>
            <div className={classes.Buttons}>
              <button
                className={classes.Button}
                onClick={
                  this.props.playlists.length > 0
                    ? this.onClick
                    : this.showModal
                }
                disabled={
                  this.props.playlists.length > 0
                    ? this.state.selectedPlaylistIndex !== null
                      ? false
                      : true
                    : false
                }
              >
                {this.props.playlists.length > 0 ? "Add" : "Create"}
              </button>
              <button className={classes.Cancel} onClick={this.closePlaylists}>
                Cancel
              </button>
            </div>
          </div>

          {this.state.showModal ? (
            <Modal
              closeModal={this.closeModal}
              action="create"
              playlistIndex={this.state.playlistIndex}
              createPlaylist={this.createPlaylist}
            />
          ) : null}
        </section>
      );
    }

    return addToPlaylist;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    playlists: state.playlists.playlists,
    loading: state.playlists.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPlaylists: userId => dispatch(fetchPlaylists(userId)),
    createPlaylist: payload => dispatch(createPlaylist(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToPlaylist);
