import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import classes from "./Controls.css";
import { usePrevious, useInterval } from "../../../hooks/customHooks";

const Controls = ({
  toggleActiveClass,
  src,
  setPreviousIndex,
  setNextIndex,
  setRandomIndex
}) => {
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

  const prevStatus = usePrevious(status);
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
    player.current.play();
    setState({ ...state, status: "playing" });
  }, [src]);

  useEffect(() => {
    if (status === "paused") {
      player.current.pause();
    }
    if (status === "playing" && prevStatus === "paused") {
      player.current.play();
    }
    if (status === "playing" && prevStatus === "stopped") {
      player.current.load();
      player.current.play();
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
      setRandomIndex();
    } else {
      setNextIndex();
    }
  };

  const onPrev = () => {
    if (random) {
      setRandomIndex();
    } else {
      setPreviousIndex();
    }
  };

  const onNext = () => {
    if (random) {
      setRandomIndex();
    } else {
      setNextIndex();
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
        src={src ? src : null}
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
  setPreviousIndex: PropTypes.func.isRequired,
  setNextIndex: PropTypes.func.isRequired,
  setRandomIndex: PropTypes.func.isRequired
};

export default Controls;
