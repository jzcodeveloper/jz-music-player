import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchPlaylist,
  resetPlaylist,
  setSongIndex
} from "../../store/actions/playerActions";

import classes from "./Player.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Information from "./Information/Information";
import Playlist from "./Playlist/Playlist";
import Controls from "./Controls/Controls";
import PlaylistItem from "./PlaylistItem/PlaylistItem";

const Player = ({ location: { pathname } }) => {
  const dispatch = useDispatch();

  const { loading, playlist, currentSongIndex } = useSelector(
    ({ player }) => player
  );

  const [showPlaylist, setShowPlaylist] = useState(false);

  const path = pathname.split("/");

  useEffect(() => {
    document.title = `JZ Music Player - Player`;
    dispatch(fetchPlaylist(path));

    return () => dispatch(resetPlaylist());
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

  const togglePlaylist = () => {
    if (showPlaylist) {
      setShowPlaylist(false);
    } else {
      setShowPlaylist(true);
    }
  };

  const song = playlist[currentSongIndex];

  return (
    <>
      {loading || !song ? (
        <Spinner />
      ) : (
        <>
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
            currentSongIndex={currentSongIndex}
            playlistLength={playlist.length}
          />
        </>
      )}
    </>
  );
};

Player.propTypes = {
  location: PropTypes.object.isRequired
};

export default Player;
