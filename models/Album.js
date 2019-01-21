const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Album = new Schema({
  album: {
    type: String
  },
  albumArt: {
    type: String
  },
  count: {
    type: Number
  },
  duration: {
    type: Number
  }
});

module.exports = mongoose.model("Album", Album);
