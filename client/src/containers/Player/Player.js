import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchPlaylist,
  resetPlaylist,
  setSongIndex,
  setPreviousIndex,
  setNextIndex,
  setRandomIndex
} from "../../store/actions/playerActions";

import classes from "./Player.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Information from "./Information/Information";
import Playlist from "./Playlist/Playlist";
import Controls from "./Controls/Controls";
import PlaylistItem from "./PlaylistItem/PlaylistItem";

const Player = ({ location: { pathname } }) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ player }) => player.loading);
  const playlist = useSelector(({ player }) => player.playlist);
  const currentSongIndex = useSelector(({ player }) => player.currentSongIndex);

  const [showPlaylist, setShowPlaylist] = useState(false);

  const path = pathname.split("/");

  useEffect(() => {
    document.title = `JZ Music Player - Player`;
    dispatch(fetchPlaylist(path));

    return () => {
      dispatch(resetPlaylist());
    };
  }, []);

  const toggleActiveClass = () => {
    const { active, Player } = classes;
    const index = currentSongIndex + 1;
    const prevElement = document.querySelector(`.${active}`);
    const nextElementSelector = `.${Player} li:nth-child(${index})`;
    const nextElement = document.querySelector(nextElementSelector);
    if (prevElement) prevElement.classList.remove(active);
    if (nextElement) nextElement.classList.add(active);
    const playlist = document.querySelector(`.${Player} ul`);
    playlist.scrollTop = nextElement.offsetTop - 20;
  };

  const onClick = index => {
    dispatch(setSongIndex(index));
  };

  const onSetPreviousIndex = () => {
    if (currentSongIndex > 0) {
      dispatch(setPreviousIndex());
    }
  };

  const onSetNextIndex = () => {
    if (playlist.length - 1 > currentSongIndex) {
      dispatch(setNextIndex());
    }
  };

  const onSetRandomIndex = () => {
    dispatch(setRandomIndex());
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
        <Fragment>
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

          <section className={classes.Player}>
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
            setRandomIndex={onSetRandomIndex}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

Player.propTypes = {
  location: PropTypes.object.isRequired
};

export default Player;
