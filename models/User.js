const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album"
      }
    ],
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist"
      }
    ],
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song"
      }
    ]
  }
});

module.exports = mongoose.model("User", User);
