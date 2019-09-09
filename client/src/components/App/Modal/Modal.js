import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { setErrors } from "../../../store/actions/errorsActions";

import classes from "./Modal.css";
import { useIsMounted } from "../../../hooks/customHooks";

const Modal = ({
  createPlaylist,
  editPlaylist,
  closeModal,
  playlist,
  action
}) => {
  const dispatch = useDispatch();

  const { playlists } = useSelector(({ playlists }) => playlists);

  const errors = useSelector(({ errors }) => errors);

  const [state, setState] = useState({ name: "", description: "" });

  const { name, description } = state;

  const isMounted = useIsMounted();

  useEffect(() => {
    dispatch(setErrors());
  }, []);

  useEffect(() => {
    if (playlist) {
      const { name, description } = playlist;
      setState({ name, description });
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
  createPlaylist: PropTypes.func,
  editPlaylist: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  playlist: PropTypes.object,
  action: PropTypes.string.isRequired
};

export default Modal;
