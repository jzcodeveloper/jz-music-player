import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setErrors } from "../../../actions/errorsActions";

import classes from "./Modal.css";
import { useIsMounted } from "../../../hooks/customHooks";

const Modal = ({
  setErrors,
  createPlaylist,
  editPlaylist,
  closeModal,
  playlist,
  playlists,
  action,
  globalErrors
}) => {
  const [state, setState] = useState({ name: "", description: "", errors: {} });

  const { name, description, errors } = state;

  const isMounted = useIsMounted();

  useEffect(() => {
    setErrors();
  }, []);

  useEffect(() => {
    setState({ ...state, errors: globalErrors });
  }, [globalErrors]);

  useEffect(() => {
    if (playlist) {
      const { name, description } = playlist;
      setState({ ...state, name, description });
    }
  }, [playlist]);

  useEffect(() => {
    if (isMounted) onCloseModal();
  }, [playlists]);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (action === "create") {
      createPlaylist({ name, description });
    } else {
      editPlaylist({ name, description });
    }
  };

  const onCloseModal = () => {
    const { OpenModal, CloseModal } = classes;
    const el = document.querySelector(`.${OpenModal}`);
    if (el) el.classList.replace(OpenModal, CloseModal);
    setTimeout(() => closeModal(), 700);
  };

  const title = action === "create" ? "Create Playlist" : "Edit Playlist";
  const caption = action === "create" ? "Create" : "Edit";

  return (
    <section className={classes.Modal}>
      <div className={classes.OpenModal}>
        <h1>{title}</h1>
        <span>Fill up all the fields</span>
        <input
          className={errors.name ? classes.Invalid : null}
          name="name"
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={onChange}
          autoFocus
        />
        {errors.name ? <p>{errors.name}</p> : null}
        <input
          className={errors.description ? classes.Invalid : null}
          name="description"
          type="text"
          placeholder="Playlist Description"
          value={description}
          onChange={onChange}
        />
        {errors.description ? <p>{errors.description}</p> : null}

        <div>
          <button className={classes.Button} onClick={onSubmit}>
            {caption}
          </button>
          <button className={classes.Cancel} onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

Modal.propTypes = {
  setErrors: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func,
  editPlaylist: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  playlist: PropTypes.object,
  playlists: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  globalErrors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    playlists: state.playlists.playlists,
    globalErrors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { setErrors }
)(Modal);
