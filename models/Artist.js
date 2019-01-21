const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Artist = new Schema({
  artist: {
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

module.exports = mongoose.model("Artist", Artist);
