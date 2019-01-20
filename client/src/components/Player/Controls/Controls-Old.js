/*componentDidMount() {
  this.audio.onended = this.props.onEnded;
}

componentWillReceiveProps(nextProps) {
  this.audio.src = nextProps.src;
}

updateProgress = () => {
  if (!this.audio.ended) {
    console.log("[updateProgress]: ", this.audio.currentTime);
    const width = parseInt(
      (this.audio.currentTime * 100) / this.audio.duration
    );
    this.setState({ sliderValue: width });
  } else {
    this.setState({ sliderValue: 0, playing: false });
    clearInterval(this.loop);
  }
};

onClick = e => {
  if (!this.audio.paused && !this.audio.ended) {
    this.setState({ playing: false });
    this.audio.pause();
    clearInterval(this.loop);
  } else {
    this.setState({ playing: true });
    this.audio.play();
    this.loop = setInterval(this.updateProgress, 500);
  }
};

onChange = e => {
  if (!this.audio.paused && !this.audio.ended) {
    const time = (e.target.value * this.audio.duration) / 100;
    this.audio.src = this.props.src;
    this.audio.currentTime = time;
    setTimeout(() => this.audio.play(), 1000);
    this.setState({ sliderValue: e.target.value });
  }
};*/
