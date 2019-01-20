const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Song = new Schema({
  album: {
    type: String
  },
  albumArt: {
    type: String
  },
  albumArtist: {
    type: String
  },
  artist: {
    type: String
  },
  artists: [String],
  duration: {
    type: Number
  },
  genre: [String],
  title: {
    type: String
  },
  url: {
    type: String
  },
  year: {
    type: Number
  }
});

module.exports = mongoose.model("Song", Song);
