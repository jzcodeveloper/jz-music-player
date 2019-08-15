import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchPlaylists,
  createPlaylist,
  addToPlaylist
} from "../../../store/actions/playlistsActions";

import classes from "./AddToPlaylist.css";
import Modal from "../Modal/Modal";

const AddToPlaylist = ({ closePlaylists, pathname, itemId }) => {
  const dispatch = useDispatch();
  const playlists = useSelector(({ playlists }) => playlists.playlists);

  const [state, setState] = useState({
    selectedPlaylistIndex: null,
    showModal: false
  });

  const { selectedPlaylistIndex, showModal } = state;

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

  const selectPlaylist = index => {
    setState({ ...state, selectedPlaylistIndex: index });
  };

  const onClick = () => {
    const { _id } = playlists[selectedPlaylistIndex];
    dispatch(addToPlaylist(pathname, _id, itemId));
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
    dispatch(createPlaylist(payload));
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
  closePlaylists: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired
};

export default AddToPlaylist;
