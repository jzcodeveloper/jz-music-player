import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  editPlaylist,
  removePlaylist
} from "../../../actions/playlistsActions";

import classes from "./Playlist.css";
import Confirmation from "../../../components/UI/Confirmation/Confirmation";
import Notification from "../../../components/UI/Notification/Notification";
import Modal from "../../../components/App/Modal/Modal";
import ListElement from "../../../components/App/ListElement/ListElement";

import { secondsToHms } from "../../../utils/utility";

const Playlist = ({ editPlaylist, removePlaylist, index, playlist }) => {
  const [state, setState] = useState({
    showModal: false,
    showConfirmation: false,
    showNotification: false,
    action: ""
  });

  const { showModal, showConfirmation, showNotification, action } = state;
  const { _id, name, description, count, duration, songs } = playlist;

  const toggleClassName = () => {
    //Collapse / Expand
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

  const onEditPlaylist = payload => {
    editPlaylist(_id, payload);
  };

  const onRemovePlaylist = () => {
    closePlaylist();
    setTimeout(() => removePlaylist(_id), 500);
  };

  const closePlaylist = () => {
    const { OpenPlaylist, ClosePlaylist } = classes;
    const selector = `.${OpenPlaylist}`;
    const elements = document.querySelectorAll(selector);
    if (elements[index]) {
      elements[index].classList.replace(OpenPlaylist, ClosePlaylist);
    }
  };

  const onRemoveClick = () => {
    setState({ ...state, action: "removePlaylist", showConfirmation: true });
  };

  const onCloseConfirmation = () => {
    setState({ ...state, action: "", showConfirmation: false });
  };

  const onShowModal = () => {
    setState({ ...state, showModal: true });
  };

  const onCloseModal = () => {
    setState({ ...state, showModal: false });
  };

  const onShowNotification = () => {
    setState({ ...state, showNotification: true });
  };

  const onCloseNotification = () => {
    setState({ ...state, showNotification: false });
  };

  let title = "";
  let question = "Are you sure you want to remove the playlist ";
  if (action === "removePlaylist") {
    title = "Remove playlist";
    question += `'${name}'?`;
  }

  return (
    <Fragment>
      <div className={`${classes.OpenPlaylist}`}>
        <div className={`${classes.Playlist}`}>
          <div>
            <span>{name}</span>
            <p>{description}</p>
          </div>

          <p>Songs: {count}</p>
          <p>Duration: {secondsToHms(duration) || 0}</p>
          <div>
            {songs.length > 0 ? (
              <Link className={classes.Play} to={`/player/playlists/${name}`}>
                <i className="fas fa-play" />
              </Link>
            ) : (
              <button className={classes.Play} onClick={onShowNotification}>
                <i className="fas fa-play" />
              </button>
            )}

            <button className={classes.Edit} onClick={onShowModal}>
              <i className="fas fa-edit" />
            </button>
            <button className={classes.Remove} onClick={onRemoveClick}>
              <i className="far fa-trash-alt" />
            </button>
            <button className={classes.Expand} onClick={toggleClassName}>
              <i className="fas fa-plus-circle" />
            </button>
          </div>
        </div>

        <div>
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <ListElement
                key={song._id}
                index={index + 1}
                pathname="songs"
                info={song}
                playlist={playlist}
              />
            ))
          ) : (
            <div className={classes.Center}>
              <p>No songs added yet</p>
            </div>
          )}
        </div>
      </div>

      {showModal ? (
        <Modal
          closeModal={onCloseModal}
          action={"edit"}
          playlist={playlist}
          playlistIndex={index}
          editPlaylist={onEditPlaylist}
        />
      ) : null}

      {showNotification ? (
        <Notification
          title="Cannot play playlist"
          message="There must be at least one song added to this playlist in order to play it"
          closeNotification={onCloseNotification}
        />
      ) : null}

      {showConfirmation ? (
        <Confirmation
          title={title}
          question={question}
          caption1="Remove"
          caption2="Cancel"
          action={onRemovePlaylist}
          closeConfirmation={onCloseConfirmation}
        />
      ) : null}
    </Fragment>
  );
};

Playlist.propTypes = {
  editPlaylist: PropTypes.func.isRequired,
  removePlaylist: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  playlist: PropTypes.object
};

export default connect(
  null,
  { editPlaylist, removePlaylist }
)(Playlist);
