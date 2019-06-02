import React, { Component } from "react";
import classes from "./Controls.css";

class Controls extends Component {
  state = {
    currentTime: 0,
    duration: 0,
    loop: false,
    muted: false,
    random: false,
    sliderPosition: 0,
    status: "stopped",
    volume: 100
  };

  componentDidMount() {
    this._isMounted = true;
    this.progressInterval = setInterval(() => {
      if (!this.player.paused) {
        const e = this.player;
        const sliderValue = (e.currentTime / e.duration) * 100;

        if (this._isMounted) {
          this.setState({
            currentTime: e.currentTime || 0,
            duration: e.duration || 0,
            sliderPosition: sliderValue || 0
          });
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.progressInterval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.src !== prevProps.src) {
      this.player.src = this.props.src;
      this.player.play();
      this.setState({ status: "playing" });
    }

    if (this.state.status !== prevState.status) {
      if (this.state.status === "paused") {
        this.player.pause();
      }
      if (this.state.status === "playing" && prevState.status === "paused") {
        this.player.play();
      }
      if (this.state.status === "playing" && prevState.status === "stopped") {
        this.player.load();
        this.player.play();
      }
    }
  }

  getTime = time => {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  };

  onChange = e => {
    const currentTime = (e.target.value * this.state.duration) / 100;
    this.player.currentTime = currentTime;
    this.setState({ currentTime });
  };

  onVolumeChange = e => {
    const volume = e.target.value / 100;
    this.player.volume = volume;
    this.setState({ volume });
  };

  onEnded = () => {
    if (this.state.random) {
      this.props.setRandomIndex();
    } else {
      this.props.setNextIndex();
    }
  };

  onPrev = () => {
    if (this.state.random) {
      this.props.setRandomIndex();
    } else {
      this.props.setPreviousIndex();
    }
  };

  onNext = () => {
    if (this.state.random) {
      this.props.setRandomIndex();
    } else {
      this.props.setNextIndex();
    }
  };

  setStatus = newStatus => {
    if (this._isMounted) {
      this.setState({ status: newStatus });
    }
  };

  setLoop = () => {
    this.setState(prevState => {
      return { loop: !prevState.loop };
    });
  };

  setRandom = () => {
    this.setState(prevState => {
      return { random: !prevState.random };
    });
  };

  setMuted = () => {
    this.setState(prevState => {
      return { muted: !prevState.muted };
    });
  };

  render() {
    const currentTime = this.getTime(this.state.currentTime);
    const duration = this.getTime(this.state.duration);
    const volume = this.state.volume * 100;
    const { status, muted } = this.state;
    let volumeIcon = "";
    if (volume >= 25) volumeIcon = "fa-volume-up";
    if (volume < 25) volumeIcon = "fa-volume-down";
    if (volume === 0 || muted) volumeIcon = "fa-volume-off";

    return (
      <div className={classes.Controls}>
        <div className={classes.slidecontainer}>
          <input
            type="range"
            min="1"
            max="100"
            step="0.1"
            value={this.state.sliderPosition}
            onChange={this.onChange}
            className={classes.slider}
          />
          <progress
            min="1"
            max="100"
            value={this.state.sliderPosition}
            className={classes.Progress}
          />
        </div>

        <i
          className={`fas fa-redo ${classes.Repeat} ${
            this.state.loop ? `${classes.Brown}` : ""
          }`}
          onClick={this.setLoop}
        />
        <i
          className={`fas fa-random ${classes.Shuffle} ${
            this.state.random ? `${classes.Brown}` : ""
          }`}
          onClick={this.setRandom}
        />
        <div className={classes.Volume}>
          <i
            className={`fas ${volumeIcon} ${classes.VolumeIcon}`}
            onClick={this.setMuted}
          />
          <div className={classes.VolumeIndicator}>
            <input
              type="range"
              min="1"
              max="100"
              step="0.1"
              value={this.state.volume * 100}
              onChange={this.onVolumeChange}
              className={classes.slider}
            />
            <progress
              min="1"
              max="100"
              value={this.state.volume * 100}
              className={classes.Progress}
            />
          </div>
        </div>
        <span>{currentTime}</span>
        <span>{duration}</span>

        <div>
          <i
            className={`fa fa-step-backward ${classes.FastBackward}`}
            onClick={this.onPrev}
          />

          {status === "paused" || status === "stopped" ? (
            <i
              className={`fa fa-play-circle ${classes.MainButton}`}
              onClick={() => this.setStatus("playing")}
            />
          ) : (
            <i
              className={`fa fa-pause-circle ${classes.MainButton}`}
              onClick={() => this.setStatus("paused")}
            />
          )}

          <i
            className={`fa fa-step-forward ${classes.FastForward}`}
            onClick={this.onNext}
          />
        </div>

        <audio
          controlsList="nodownload"
          ref={ref => (this.player = ref)}
          src={this.props.src ? this.props.src : null}
          onEnded={this.onEnded}
          onPlay={this.props.toggleActiveClass}
          loop={this.state.loop}
          muted={this.state.muted}
          volume={this.state.volume}
        />
      </div>
    );
  }
}

export default Controls;
