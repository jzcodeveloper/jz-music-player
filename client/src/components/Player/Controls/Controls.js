import React, { Component } from "react";
import classes from "./Controls.css";

class Controls extends Component {
  state = {
    currentTime: 0,
    duration: 0,
    sliderPosition: 0,
    loop: false,
    status: "stopped"
  };

  componentDidMount() {
    this._isMounted = true;
    this.player.addEventListener("timeupdate", e => {
      const sliderValue = (e.target.currentTime / e.target.duration) * 100;
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration || 0,
        sliderPosition: sliderValue || 0
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
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
  };

  toggleLoop = e => {
    if (this.state.loop) {
      this.player.loop = false;
      this.setState({ loop: false });
    } else {
      this.player.loop = true;
      this.setState({ loop: true });
    }
  };

  setStatus = newStatus => {
    if (this._isMounted) {
      this.setState({ status: newStatus });
    }
  };

  render() {
    const currentTime = this.getTime(this.state.currentTime);
    const duration = this.getTime(this.state.duration);
    const status = this.state.status;

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
        </div>

        <span>{currentTime}</span>
        <span>{duration}</span>

        <div>
          <i
            className={`fa fa-step-backward ${classes.FastBackward}`}
            onClick={this.props.setPreviousIndex}
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
            onClick={this.props.setNextIndex}
          />
        </div>

        <audio
          controlsList="nodownload"
          ref={ref => (this.player = ref)}
          src={this.props.src ? this.props.src : null}
          onEnded={this.props.setNextIndex}
          onPlay={this.props.toggleActiveClass}
        />
      </div>
    );
  }
}

export default Controls;
