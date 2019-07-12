import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchPlaylists, createPlaylist } from "../../actions/playlistsActions";

import classes from "./Playlists.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/App/Modal/Modal";
import Playlist from "./Playlist/Playlist";

const Playlists = ({
  fetchPlaylists,
  createPlaylist,
  loading,
  playlists,
  history
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = `JZ Music Player - My Playlists`;
    fetchPlaylists();
  }, []);

  const onCreatePlaylist = payload => {
    createPlaylist(payload);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.Playlists}>
          <h1>My Playlists</h1>
          <button className={classes.CreatePlaylist} onClick={onShowModal}>
            Create Playlist
          </button>
          {playlists.length > 0 ? (
            playlists.map((playlist, index) => (
              <div key={playlist._id}>
                <Playlist playlist={playlist} index={index} />
              </div>
            ))
          ) : (
            <div>
              <p>You have not created any playlist</p>
            </div>
          )}

          {showModal ? (
            <Modal
              closeModal={onCloseModal}
              action={"create"}
              createPlaylist={onCreatePlaylist}
            />
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

Playlists.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  playlists: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    loading: state.playlists.loading,
    playlists: state.playlists.playlists
  };
};

export default connect(
  mapStateToProps,
  { fetchPlaylists, createPlaylist }
)(Playlists);
