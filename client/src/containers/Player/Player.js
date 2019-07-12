import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchPlaylist,
  resetPlaylist,
  setSongIndex,
  setPreviousIndex,
  setNextIndex,
  setRandomIndex
} from "../../actions/playerActions";

import classes from "./Player.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Information from "./Information/Information";
import Playlist from "./Playlist/Playlist";
import Controls from "./Controls/Controls";
import PlaylistItem from "./PlaylistItem/PlaylistItem";

const Player = ({
  fetchPlaylist,
  resetPlaylist,
  setSongIndex,
  setPreviousIndex,
  setNextIndex,
  setRandomIndex,
  currentSongIndex,
  loading,
  playlist,
  location: { pathname }
}) => {
  const [showPlaylist, setShowPlaylist] = useState(false);

  const path = pathname.split("/");

  useEffect(() => {
    document.title = `JZ Music Player - Player`;
    fetchPlaylist(path);

    return () => {
      resetPlaylist();
    };
  }, []);

  const toggleActiveClass = () => {
    const index = currentSongIndex + 1;
    const { active, Player } = classes;
    const prevElement = document.querySelector(`.${active}`);
    const nextElementSelector = `.${Player} li:nth-child(${index})`;
    const nextElement = document.querySelector(nextElementSelector);
    if (prevElement) prevElement.classList.remove(active);
    if (nextElement) nextElement.classList.add(active);
    const playlist = document.querySelector(`.${Player} ul`);
    playlist.scrollTop = nextElement.offsetTop - 20;
  };

  const onClick = index => {
    setSongIndex(index);
  };

  const onSetPreviousIndex = () => {
    if (currentSongIndex > 0) {
      setPreviousIndex();
    }
  };

  const onSetNextIndex = () => {
    if (playlist.length - 1 > currentSongIndex) {
      setNextIndex();
    }
  };

  const togglePlaylist = () => {
    if (showPlaylist) {
      setShowPlaylist(false);
    } else {
      setShowPlaylist(true);
    }
  };

  const song = playlist[currentSongIndex];

  return (
    <Fragment>
      {loading || !song ? (
        <Spinner />
      ) : (
        <div className={classes.Player}>
          <div className={classes.TopSection}>
            <PlaylistItem
              albumArt={song.albumArt}
              title={song.title}
              artist={song.artist}
            />
            <i
              className={`fas fa-list-ul ${
                showPlaylist ? `${classes.Brown}` : ""
              } ${classes.PlaylistIcon}`}
              onClick={togglePlaylist}
            />
          </div>

          <section>
            <div>
              {showPlaylist ? null : (
                <Playlist
                  playlist={playlist}
                  onClick={onClick}
                  toggleActiveClass={toggleActiveClass}
                />
              )}
            </div>
            <div>
              <Information song={song} />
              {showPlaylist ? (
                <Playlist
                  playlist={playlist}
                  onClick={onClick}
                  toggleActiveClass={toggleActiveClass}
                />
              ) : null}
            </div>
          </section>

          <Controls
            src={song.url}
            toggleActiveClass={toggleActiveClass}
            setPreviousIndex={onSetPreviousIndex}
            setNextIndex={onSetNextIndex}
            setRandomIndex={setRandomIndex}
          />
        </div>
      )}
    </Fragment>
  );
};

Player.propTypes = {
  fetchPlaylist: PropTypes.func.isRequired,
  resetPlaylist: PropTypes.func.isRequired,
  setSongIndex: PropTypes.func.isRequired,
  setPreviousIndex: PropTypes.func.isRequired,
  setNextIndex: PropTypes.func.isRequired,
  setRandomIndex: PropTypes.func.isRequired,
  currentSongIndex: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  playlist: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    playlist: state.player.playlist,
    currentSongIndex: state.player.currentSongIndex,
    loading: state.player.loading
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPlaylist,
    resetPlaylist,
    setSongIndex,
    setPreviousIndex,
    setNextIndex,
    setRandomIndex
  }
)(Player);
