const express = require("express");
const router = express.Router();
const passport = require("passport");

const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Playlist = require("../models/Playlist");

const PlaylistsController = require("../controllers/PlaylistsController");

//Returns all playlists
router.get(
  "/all/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PlaylistsController.getAll(req, res, Playlist);
  }
);

//Creates a new playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PlaylistsController.createPlaylist(req, res, Playlist);
  }
);

//Updates both the name and description of a given playlist
router.put(
  "/edit/:playlistId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PlaylistsController.editPlaylist(req, res, Playlist);
  }
);

//Appends a given song to a given playlist
router.put(
  "/add-songs/:playlistId/:itemId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PlaylistsController.addToPlaylist(req, res, Playlist, Song, "song");
  }
);

//Appends all songs from a given album to a given playlist
router.put(
  "/add-albums/:playlistId/:itemId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PlaylistsController.addToPlaylist(req, res, Playlist, Album, "album");
  }
);

//Appends all songs from a given artist to a given playlist
router.put(
  "/add-artists/:playlistId/:itemId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PlaylistsController.addToPlaylist(req, res, Playlist, Artist, "artist");
  }
);

//Removes a song from a given playlist
router.delete(
  "/remove-song/:playlistId/:songId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PlaylistsController.removeSong(req, res, Playlist, Song);
  }
);

//Removes a playlist
router.delete(
  "/remove/:playlistId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PlaylistsController.removePlaylist(req, res, Playlist);
  }
);

module.exports = router;
