import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Modal.css";
import { setErrors } from "../../../actions/errorsActions";

class Modal extends Component {
  state = {
    name: "",
    description: "",
    errors: {}
  };

  componentDidMount() {
    this.props.setErrors();
    if (this.props.action === "edit") {
      const playlist = this.props.playlists[this.props.playlistIndex];
      this.setState({ name: playlist.name, description: playlist.description });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors)
      this.setState({ errors: this.props.errors });
    if (prevProps.playlists !== this.props.playlists) {
      this.closeModal();
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const playlistData = {
      name: this.state.name,
      description: this.state.description,
      user: this.props.user.id
    };

    if (this.props.action === "create") {
      this.props.createPlaylist(playlistData);
    } else {
      const playlist = this.props.playlists[this.props.playlistIndex];
      this.props.editPlaylist(playlist._id, playlistData);
    }
  };

  closeModal = () => {
    const el = document.querySelector(`.${classes.OpenModal}`);
    el.className = classes.CloseModal;
    setTimeout(() => this.props.closeModal(), 700);
  };

  render() {
    const { errors } = this.state;
    const title =
      this.props.action === "create" ? "Create Playlist" : "Edit Playlist";
    const caption = this.props.action === "create" ? "Create" : "Edit";

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
            value={this.state.name}
            onChange={this.onChange}
            autoFocus
          />
          {errors.name ? <p>{errors.name}</p> : null}
          <input
            className={errors.description ? classes.Invalid : null}
            name="description"
            type="text"
            placeholder="Playlist Description"
            value={this.state.description}
            onChange={this.onChange}
          />
          {errors.description ? <p>{errors.description}</p> : null}
          <div>
            <button className={classes.Button} onClick={this.onSubmit}>
              {caption}
            </button>
            <button className={classes.Cancel} onClick={this.closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    playlists: state.playlists.playlists,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setErrors: () => dispatch(setErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
