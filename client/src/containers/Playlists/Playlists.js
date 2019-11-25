import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchPlaylists,
  createPlaylist
} from "../../store/actions/playlistsActions";

import classes from "./Playlists.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/App/Modal/Modal";
import Playlist from "./Playlist/Playlist";

const Playlists = () => {
  const dispatch = useDispatch();

  const { loading, playlists } = useSelector(({ playlists }) => playlists);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = `JZ Music Player - My Playlists`;
    dispatch(fetchPlaylists());
  }, []);

  const onCreatePlaylist = payload => {
    dispatch(createPlaylist(payload));
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
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
    </>
  );
};

export default Playlists;
