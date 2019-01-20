import React, { Component } from "react";
import classes from "./Controls.css";

class Controls extends Component {
  state = {
    duration: null
  };

  handlePlay() {
    this.audio.play();
  }

  handleStop() {
    this.audio.currentTime = 0;
    this.slider.value = 0;
    this.audio.pause();
  }

  componentDidMount() {
    this.slider.value = 0;
    this.currentTimeInterval = null;

    // Get duration of the song and set it as max slider value
    this.audio.onloadedmetadata = function() {
      this.audio.currentTime = 0;
      this.setState({ duration: this.audio.duration });
    }.bind(this);

    // Sync slider position with song current time
    this.audio.onplay = () => {
      this.currentTimeInterval = setInterval(() => {
        this.slider.value = this.audio.currentTime;
      }, 500);
    };

    this.audio.onpause = () => {
      clearInterval(this.currentTimeInterval);
    };

    // Seek functionality
    this.slider.onchange = e => {
      clearInterval(this.currentTimeInterval);
      this.audio.currentTime = e.target.value;
    };
  }

  render() {
    return (
      <div className={classes.Controls}>
        <div>
          <audio
            ref={audio => (this.audio = audio)}
            src={this.props.src}
            preload="none"
          />
          <button onClick={this.handlePlay.bind(this)}>Play</button>
          <button onClick={this.handleStop.bind(this)}>Stop</button>
          <input
            ref={slider => (this.slider = slider)}
            className={classes.slider}
            type="range"
            min="0"
            max={this.state.duration}
          />
        </div>
      </div>
    );
  }
}

export default Controls;
