import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Playlists.css";

import { fetchPlaylists, createPlaylist } from "../../actions/playlistsActions";

import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/App/Modal/Modal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Playlist from "./Playlist/Playlist";

class Playlists extends Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    document.title = `JZ Music Player - My Playlists`;
    this.props.fetchPlaylists(this.props.user.id);
  }

  createPlaylist = payload => {
    const { createPlaylist } = this.props;
    createPlaylist(payload);
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { playlists, history } = this.props;

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
                <Playlist playlist={playlist} index={index} history={history} />
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
              action={"create"}
              createPlaylist={this.createPlaylist}
            />
          ) : null}
          {this.state.showModal ? <Backdrop show /> : null}
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
    createPlaylist: payload => dispatch(createPlaylist(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
