import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import classes from "./Controls.css";
import {
  setPreviousIndex,
  setNextIndex,
  setRandomIndex
} from "../../../store/actions/playerActions";
import { /* usePrevious, */ useInterval } from "../../../hooks/customHooks";

const Controls = ({
  toggleActiveClass,
  src,
  currentSongIndex,
  playlistLength
}) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    currentTime: 0,
    duration: 0,
    loop: false,
    muted: false,
    random: false,
    sliderPosition: 0,
    status: "stopped",
    volume: 1
  });

  const {
    currentTime,
    duration,
    loop,
    muted,
    random,
    sliderPosition,
    status,
    volume
  } = state;

  /* const prevStatus = usePrevious(status); */
  const player = useRef();

  useInterval(() => {
    if (!player.current.paused) {
      const e = player.current;
      const sliderValue = (e.currentTime / e.duration) * 100;

      setState(prevState => ({
        ...prevState,
        currentTime: e.currentTime || 0,
        duration: e.duration || 0,
        sliderPosition: sliderValue || 0
      }));
    }
  }, 1000);

  useEffect(() => {
    player.current.src = src;
    setStatus("stopped");
  }, [src]);

  useEffect(() => {
    if (status === "paused") {
      player.current.pause();
    }
    if (status === "playing") {
      player.current.play();
    }
    if (status === "stopped") {
      player.current.load();
      setState({
        ...state,
        currentTime: 0,
        duration: 0,
        sliderPosition: 0,
        status: "playing"
      });
    }
  }, [status]);

  const getTime = time => {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  };

  const onChange = e => {
    const currentTime = (e.target.value * duration) / 100;
    player.current.currentTime = currentTime;
    setState({ ...state, currentTime });
  };

  const onVolumeChange = e => {
    const volume = e.target.value / 100;
    player.current.volume = volume;
    setState({ ...state, volume });
  };

  const onEnded = () => {
    if (random) {
      onSetRandomIndex();
    } else {
      onSetNextIndex();
    }
  };

  const onPrev = () => {
    if (random) {
      onSetRandomIndex();
    } else {
      onSetPreviousIndex();
    }
  };

  const onNext = () => {
    if (random) {
      onSetRandomIndex();
    } else {
      onSetNextIndex();
    }
  };

  const setStatus = newStatus => {
    setState({ ...state, status: newStatus });
  };

  const setLoop = () => {
    setState({ ...state, loop: !loop });
  };

  const setRandom = () => {
    setState({ ...state, random: !random });
  };

  const setMuted = () => {
    setState({ ...state, muted: !muted });
  };

  const onSetPreviousIndex = () => {
    if (currentSongIndex > 0) {
      dispatch(setPreviousIndex());
      setStatus("stopped");
    }
  };

  const onSetNextIndex = () => {
    if (playlistLength - 1 > currentSongIndex) {
      dispatch(setNextIndex());
      setStatus("stopped");
    }
  };

  const onSetRandomIndex = () => {
    dispatch(setRandomIndex());
    setStatus("stopped");
  };

  const convertedVolume = volume * 100;

  const repeatIcon = `${classes.Repeat} ${loop ? `${classes.Brown}` : ""}`;
  const randomIcon = `${classes.Shuffle} ${random ? `${classes.Brown}` : ""}`;
  const backwardIcon = `fa fa-step-backward ${classes.FastBackward}`;
  const forwardIcon = `fa fa-step-forward ${classes.FastForward}`;

  let volumeIcon = `${classes.VolumeIcon} `;
  if (convertedVolume >= 25) volumeIcon += "fa-volume-up";
  if (convertedVolume < 25) volumeIcon += "fa-volume-down";
  if (convertedVolume === 0 || muted)
    volumeIcon = `${classes.VolumeIcon} fa-volume-off`;

  let playIcon = `${classes.MainButton} `;
  if (status === "paused" || status === "stopped") {
    playIcon += "fa-play-circle";
  } else {
    playIcon += "fa-pause-circle";
  }

  return (
    <div className={classes.Controls}>
      <div className={classes.slidecontainer}>
        <input
          type="range"
          min="1"
          max="100"
          step="0.1"
          value={sliderPosition}
          onChange={onChange}
          className={classes.slider}
        />
        <progress
          min="1"
          max="100"
          value={sliderPosition}
          className={classes.Progress}
        />
      </div>

      <i className={`fas fa-redo ${repeatIcon}`} onClick={setLoop} />
      <i className={`fas fa-random ${randomIcon}`} onClick={setRandom} />

      <div className={classes.Volume}>
        <i className={`fas ${volumeIcon}`} onClick={setMuted} />
        <div className={classes.VolumeIndicator}>
          <input
            type="range"
            min="1"
            max="100"
            step="0.1"
            value={convertedVolume}
            onChange={onVolumeChange}
            className={classes.slider}
          />
          <progress
            min="1"
            max="100"
            value={convertedVolume}
            className={classes.Progress}
          />
        </div>
      </div>
      <span>{getTime(currentTime)}</span>
      <span>{getTime(duration)}</span>

      <div>
        <i className={backwardIcon} onClick={onPrev} />

        <i
          className={`fa ${playIcon}`}
          onClick={
            status === "paused" || status === "stopped"
              ? () => setStatus("playing")
              : () => setStatus("paused")
          }
        />

        <i className={forwardIcon} onClick={onNext} />
      </div>

      <audio
        controlsList="nodownload"
        ref={player}
        onEnded={onEnded}
        onPlay={toggleActiveClass}
        loop={loop}
        muted={muted}
        volume={volume}
      />
    </div>
  );
};

Controls.propTypes = {
  toggleActiveClass: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  currentSongIndex: PropTypes.number.isRequired,
  playlistLength: PropTypes.number.isRequired
};

export default Controls;
