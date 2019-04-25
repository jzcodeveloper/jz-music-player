import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./AddToPlaylist.css";
import { fetchPlaylists } from "../../actions/playlistsActions";

import Notification from "../Notification/Notification";

class AddToPlaylist extends Component {
  state = {
    selectedPlaylistIndex: null
  };

  componentDidMount() {
    this.props.fetchPlaylists(this.props.user.id);
  }

  selectPlaylist = index => {
    const resetIcon = document.querySelectorAll(`.${classes.Icon}.fas`);
    for (let i = 0; i < resetIcon.length; i++) {
      resetIcon[i].classList.replace(`fas`, `far`);
    }
    const replaceIcon = document.querySelectorAll(`.${classes.Icon}`);
    replaceIcon[index].classList.replace(`far`, `fas`);
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

  render() {
    let addToPlaylist = (
      <Notification
        title="Cannot add to playlist"
        message="There must be at least one playlist created"
        closeNotification={this.closePlaylists}
      />
    );

    if (this.props.playlists.length > 0) {
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
                    className={`${classes.Icon} far fa-check-circle`}
                    onClick={() => this.selectPlaylist(index)}
                  />
                </div>
              ))}
            </div>
            <div className={classes.Buttons}>
              <button
                className={classes.Button}
                onClick={this.onClick}
                disabled={
                  this.state.selectedPlaylistIndex !== null ? false : true
                }
              >
                Add
              </button>
              <button className={classes.Cancel} onClick={this.closePlaylists}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      );
    }

    return addToPlaylist;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    playlists: state.playlists.playlists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPlaylists: userId => dispatch(fetchPlaylists(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToPlaylist);
