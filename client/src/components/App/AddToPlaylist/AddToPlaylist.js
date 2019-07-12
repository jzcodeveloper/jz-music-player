import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchPlaylists,
  createPlaylist,
  addToPlaylist
} from "../../../actions/playlistsActions";

import classes from "./AddToPlaylist.css";
import Modal from "../Modal/Modal";

const AddToPlaylist = ({
  fetchPlaylists,
  createPlaylist,
  addToPlaylist,
  closePlaylists,
  playlists,
  pathname,
  itemId
}) => {
  const [state, setState] = useState({
    selectedPlaylistIndex: null,
    showModal: false
  });

  const { selectedPlaylistIndex, showModal } = state;

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const selectPlaylist = index => {
    setState({ ...state, selectedPlaylistIndex: index });
  };

  const onClick = () => {
    const { _id } = playlists[selectedPlaylistIndex];
    addToPlaylist(pathname, _id, itemId);
    onClosePlaylists();
  };

  const onClosePlaylists = () => {
    const { OpenModal, CloseModal } = classes;
    const el = document.querySelector(`.${OpenModal}`);
    if (el) el.classList.replace(OpenModal, CloseModal);
    setTimeout(() => closePlaylists(), 700);
  };

  const onShowModal = () => {
    setState({ ...state, showModal: true });
  };

  const onCloseModal = () => {
    setState({ ...state, showModal: false });
  };

  const onCreatePlaylist = payload => {
    createPlaylist(payload);
  };

  const icons = ["fas fa-check-circle", "far fa-circle"];

  return (
    <Fragment>
      <section className={classes.AddToPlaylist}>
        <div className={classes.OpenModal}>
          <h1>Add to playlist</h1>
          <span>Select one of your playlists</span>

          <div className={classes.Playlists}>
            {playlists.map((playlist, index) => (
              <div key={playlist._id} className={classes.Playlist}>
                <span>{playlist.name}</span>
                <i
                  className={`${classes.Icon} ${
                    selectedPlaylistIndex === index ? icons[0] : icons[1]
                  }`}
                  onClick={() => selectPlaylist(index)}
                />
              </div>
            ))}
          </div>

          <div className={classes.Buttons}>
            <button
              className={classes.Button}
              onClick={playlists.length > 0 ? onClick : onShowModal}
              disabled={
                playlists.length > 0
                  ? selectedPlaylistIndex === null
                    ? true
                    : false
                  : false
              }
            >
              {playlists.length > 0 ? "Add" : "Create"}
            </button>
            <button className={classes.Cancel} onClick={onClosePlaylists}>
              Cancel
            </button>
          </div>
        </div>

        {showModal ? (
          <Modal
            closeModal={onCloseModal}
            action="create"
            createPlaylist={onCreatePlaylist}
          />
        ) : null}
      </section>
    </Fragment>
  );
};

AddToPlaylist.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  addToPlaylist: PropTypes.func.isRequired,
  closePlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    playlists: state.playlists.playlists
  };
};

export default connect(
  mapStateToProps,
  { fetchPlaylists, createPlaylist, addToPlaylist }
)(AddToPlaylist);
