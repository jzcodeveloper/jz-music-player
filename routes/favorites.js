const express = require("express");
const router = express.Router();
const passport = require("passport");

const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

router.get(
  "/albums/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const _id = req.params.id;
    const album = await Album.findOne({ _id });
    const index = album.favorites.indexOf(req.user._id);
    if (index >= 0) {
      album.favorites.splice(index, 1);
    } else {
      album.favorites.push(req.user._id);
    }
    const updatedAlbum = await Album.findOneAndUpdate(
      { _id },
      { favorites: album.favorites },
      { new: true }
    ).populate("albumArt");
    res.json(updatedAlbum);
  }
);

router.get(
  "/artists/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const _id = req.params.id;
    const artist = await Artist.findOne({ _id });
    const index = artist.favorites.indexOf(req.user._id);
    if (index >= 0) {
      artist.favorites.splice(index, 1);
    } else {
      artist.favorites.push(req.user._id);
    }
    const updatedArtist = await Artist.findOneAndUpdate(
      { _id },
      { favorites: artist.favorites },
      { new: true }
    ).populate("albumArt");
    res.json(updatedArtist);
  }
);

router.get(
  "/songs/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const _id = req.params.id;
    const song = await Song.findOne({ _id });
    const index = song.favorites.indexOf(req.user._id);
    if (index >= 0) {
      song.favorites.splice(index, 1);
    } else {
      song.favorites.push(req.user._id);
    }
    const updatedSong = await Song.findOneAndUpdate(
      { _id },
      { favorites: song.favorites },
      { new: true }
    ).populate("albumArt");
    res.json(updatedSong);
  }
);

module.exports = router;
