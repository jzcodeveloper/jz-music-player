const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Artist = new Schema({
  artist: {
    type: String
  },
  albumArt: {
    type: Schema.Types.ObjectId,
    ref: "AlbumArt"
  },
  count: {
    type: Number
  },
  duration: {
    type: Number
  }
});

module.exports = mongoose.model("Artist", Artist);
